from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .forms import LoginForm
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
                return HttpResponse('Login inválido')  # você pode tratar isso melhor com uma mensagem no template
    return render(request, 'login.html', {'form': form})

@login_required
def home_view(request):
    return render(request, 'home_page.html')