from django import forms
from .models import Funcionario

class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput)
    
class FuncionarioForm(forms.ModelForm):
    nova_skill = forms.CharField(max_length=100, required=False, label="Adicionar Nova Skill")

    class Meta:
        model = Funcionario
        fields = ['nome', 'cargo', 'nova_skill']
