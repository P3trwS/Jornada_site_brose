from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .forms import LoginForm
import json
from django.http import JsonResponse
from .models import Respostas
# Create your views here.

def login_view(request):
    form = LoginForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home_page')  # redireciona para a página inicial ou dashboard
            else:
                return HttpResponse('Login inválido')   # você pode tratar isso melhor com uma mensagem no template
    return render(request, 'login.html', {'form': form})

@login_required
def home_view(request):
    return render(request, 'home_page.html')

def cursos_view(request):
    return render(request, 'cursos.html')

def cursosDesc_view(request):
    return render(request, 'cursos desc.html')

def cargos_view(request):
    return render(request, 'cargos.html')

def cargosDesc_view(request):
    return render(request, 'cargos desc.html')

def funcionario_view(request):
    return render(request, 'funcionarios.html')

def funcionarioDesc_view(request):
    return render(request, 'funcionarios desc.html')

def formulario_view(request):
    if request.method == 'POST':
        try:
            # Captura os dados do Google Forms enviados via JSON
            data = json.loads(request.body)
            answers = data.get('answers')

            # Suponha que a tabela Respostas tenha campos correspondentes
            Respostas.objects.create(
                pergunta1=answers[0],
                pergunta2=answers[1],
                # Adicione outras perguntas conforme o formulário
            )

            render(request, 'formulario.html')
            return JsonResponse({'status': 'success'}, status=200)

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'invalid request'}, status=400)