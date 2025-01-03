"""
URL configuration for Jornada_brose project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from Site import views



urlpatterns = [
    path('', views.login_view, name='login'),
    path('home/', views.home_view, name='home_page'),
    path('cursos/', views.cursos_view, name='cursos'),
    path('cursos desc/', views.cursosDesc_view, name='cursos desc'),
    path('cargos/', views.cargos_view, name='cargos'),
    path('cargos desc/', views.cargosDesc_view, name='cargos desc'),
    path('funcionario desc/', views.funcionarioDesc_view, name='funcionario desc'),
    path("formulario/", views.formulario_view, name="formulario"),
    path('admin/', admin.site.urls),
    path('oauth2callback/', views.oauth2callback, name='oauth2callback'),
    path('get_form_responses/', views.get_form_responses, name='get_form_responses'),
    
    path('funcionarios/', views.funcionario_view, name='funcionario'),
    path('funcionarios/criar/', views.criar_funcionario, name='criar_funcionario'),
    path('funcionarios/editar/<int:id>/', views.editar_funcionario, name='editar_funcionario'),
    path('funcionarios/deletar/<int:id>/', views.deletar_funcionario, name='deletar_funcionario'),
    
]

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('', views.login_view, name='login'),
# ]
