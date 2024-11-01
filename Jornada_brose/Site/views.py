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
def funcionario_view(request):  
    funcionarios = Funcionario.objects.all()
    cargos = Cargo.objects.all()
    skills = Skill.objects.all()
    return render(request, "funcionarios.html", {'funcionarios': funcionarios, 'cargos': cargos, 'skills': skills})

# Criar novo funcionário
@login_required
def criar_funcionario(request):
    if request.method == 'POST':
        print(request.POST)
        form = FuncionarioForm(request.POST)
        if form.is_valid():
            funcionario = form.save(commit=False)  # Salvamos sem salvar no banco para adicionar skills
            funcionario.save()
            
            # Processar as skills existentes selecionadas
            skills_existentes = request.POST.getlist('skills_existentes')
            for skill_id in skills_existentes:
                skill = Skill.objects.get(id=skill_id)
                funcionario.skills.add(skill)
            
            # Adicionar nova skill, se houver
            nova_skill_nome = request.POST.get('nova_skill')
            if nova_skill_nome:
                nova_skill, created = Skill.objects.get_or_create(nome=nova_skill_nome)
                funcionario.skills.add(nova_skill)
                
            messages.success(request, 'Funcionário criado com sucesso!')
            return redirect('funcionario')
        else:
            messages.error(request, 'Corrija os erros no formulário.')
    return redirect('funcionario')

# Editar funcionário existente
@login_required
def editar_funcionario(request, id):
    funcionario = get_object_or_404(Funcionario, id=id)
    if request.method == 'POST':
        form = FuncionarioForm(request.POST, instance=funcionario)
        if form.is_valid():
            funcionario = form.save(commit=False)
            funcionario.save()
            
            # Atualizar skills existentes
            funcionario.skills.clear()  # Remove todas as skills atuais
            skills_existentes = request.POST.getlist('skills_existentes')
            for skill_id in skills_existentes:
                skill = Skill.objects.get(id=skill_id)
                funcionario.skills.add(skill)
            
            # Adicionar nova skill, se houver
            nova_skill_nome = request.POST.get('nova_skill')
            if nova_skill_nome:
                nova_skill, created = Skill.objects.get_or_create(nome=nova_skill_nome)
                funcionario.skills.add(nova_skill)

            messages.success(request, 'Funcionário atualizado com sucesso!')
            return redirect('funcionario')
        else:
            messages.error(request, 'Corrija os erros no formulário.')
    return redirect('funcionario')

# Deletar funcionário
@login_required
def deletar_funcionario(request, id):
    funcionario = get_object_or_404(Funcionario, id=id)
    if request.method == 'POST':
        funcionario.delete()
        messages.success(request, 'Funcionário deletado com sucesso!')
    return redirect('funcionario')
