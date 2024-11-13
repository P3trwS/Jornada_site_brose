from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .forms import LoginForm
from .models import Funcionario, Skill, Cargo
from .forms import FuncionarioForm
import json
from django.http import JsonResponse
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import Flow
import os
import pickle
from django.http import HttpRequest, HttpResponse

# Create your views here.


def login_view(request):
    form = LoginForm(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect(
                    "funcionario"
                )  # redireciona para a página inicial ou dashboard
            else:
                return HttpResponse(
                    "Login inválido"
                )  # você pode tratar isso melhor com uma mensagem no template
    return render(request, "login.html", {"form": form})



def home_view(request):
    return render(request, "home_page.html")


def cursos_view(request):
    return render(request, "cursos.html")


def cursosDesc_view(request):
    return render(request, "cursos desc.html")


def cargos_view(request):
    return render(request, "cargos.html")


def cargosDesc_view(request):
    return render(request, "cargos desc.html")

def funcionarioDesc_view(request):
    return render(request, "funcionarios desc.html")

def formulario_view(request):
    return render(request, 'formulario.html')

SCOPES = ["https://www.googleapis.com/auth/forms.responses.readonly"]

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def oauth2callback(request):
    
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    # Caminho para o arquivo credentials.json
    creds_path = os.path.join(BASE_DIR, 'credentials.json')

    flow = Flow.from_client_secrets_file(
        creds_path, scopes=SCOPES, redirect_uri='http://localhost:8000/oauth2callback/')

    if 'code' not in request.GET:
        authorization_url, state = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true')
        return redirect(authorization_url)
    else:
        flow.fetch_token(authorization_response=request.build_absolute_uri())
        credentials = flow.credentials
        # Salve as credenciais em um arquivo
        token_path = os.path.join(BASE_DIR, 'token.pkl')
        with open(token_path, 'wb') as token:
            pickle.dump(credentials, token)
        return HttpResponse('Autenticação concluída!')


def get_form_responses(request):
    # Caminho para o arquivo token.pkl
    token_path = os.path.join(BASE_DIR, 'token.pkl')

    if os.path.exists(token_path):
        with open(token_path, 'rb') as token:
            credentials = pickle.load(token)
    else:
        return redirect('oauth2callback')

    # Construir o serviço da API
    service = build('forms', 'v1', credentials=credentials)

    # Substitua 'your_form_id' pelo ID do seu formulário
    form_id = '1P4mTdpevdkJ4K3P-R_lqo95bVuOpCbDKbnQOH6v8rds'
    result = service.forms().responses().list(formId=form_id).execute()

    responses = result.get('responses', [])

    # Processar as respostas conforme necessário
    return HttpResponse(f'Respostas: {responses}')


@login_required
def funcionario_view(request: HttpRequest) -> HttpResponse:  
    funcionarios = Funcionario.objects.select_related("cargo").prefetch_related("skills")
    cargos = Cargo.objects.all()
    skills = Skill.objects.all()
    return render(request, "funcionarios.html", {'funcionarios': funcionarios, 'cargos': cargos, 'skills': skills})


@login_required
def criar_funcionario(request: HttpRequest) -> HttpResponse:
    if request.method == 'POST':
        form = FuncionarioForm(request.POST)
        if form.is_valid():
            funcionario = form.save(commit=False)
            funcionario.save()
            print(f"Debug: Funcionário '{funcionario.nome}' salvo com sucesso!")  # Debug

            # Captura todas as skills enviadas na lista 'skills[]'
            skills_list = request.POST.getlist('skills[]')
            print(f"Debug: Lista de skills recebida: {skills_list}")  # Debug para verificar a lista

            for skill_name in skills_list:
                # Verifica ou cria cada skill individualmente e associa ao funcionário
                skill, created = Skill.objects.get_or_create(nome=skill_name)
                funcionario.skills.add(skill)
                print(f"Debug: Skill '{skill.nome}' associada ao funcionário '{funcionario.nome}'")  # Debug para cada skill

            messages.success(request, 'Funcionário criado com sucesso!')
            return redirect('funcionario')
        else:
            print("Debug: Erros no formulário:", form.errors)  # Debug de erros no formulário
            messages.error(request, 'Corrija os erros no formulário.')
    else:
        form = FuncionarioForm()

    cargos = Cargo.objects.all()
    skills = Skill.objects.all()

    return render(request, "funcionarios.html", {
        'form': form,
        'cargos': cargos,
        'skills': skills,
    })

@login_required
def editar_funcionario(request: HttpRequest, id: int) -> HttpResponse:
    funcionario = get_object_or_404(Funcionario, id=id)
    if request.method == 'POST':
        form = FuncionarioForm(request.POST, instance=funcionario)
        if form.is_valid():
            funcionario = form.save(commit=False)
            funcionario.save()
            atualizar_skills(funcionario, request.POST)
            messages.success(request, 'Funcionário atualizado com sucesso!')
            return redirect('funcionario')
        messages.error(request, 'Corrija os erros no formulário.')
    return redirect('funcionario')


@login_required
def deletar_funcionario(request: HttpRequest, id: int) -> HttpResponse:
    funcionario = get_object_or_404(Funcionario, id=id)
    if request.method == 'POST':
        funcionario.delete()
        messages.success(request, 'Funcionário deletado com sucesso!')
    return redirect('funcionario')


def atualizar_skills(funcionario: Funcionario, post_data: dict) -> None:
    """
    Atualiza as skills do funcionário, processando tanto skills existentes quanto novas.
    """
    funcionario.skills.clear()
    skills_existentes = post_data.getlist('skills_existentes')
    
    for skill_id in skills_existentes:
        skill = Skill.objects.get(id=skill_id)
        funcionario.skills.add(skill)
    
    nova_skill_nome = post_data.get('nova_skill')
    if nova_skill_nome:
        nova_skill, _ = Skill.objects.get_or_create(nome=nova_skill_nome)
        funcionario.skills.add(nova_skill)