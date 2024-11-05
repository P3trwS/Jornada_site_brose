from django import forms
from .models import Funcionario, Skill

class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput)
    
class FuncionarioForm(forms.ModelForm):
    skills = forms.ModelMultipleChoiceField(
        queryset=Skill.objects.all(),
        required=False,
        widget=forms.CheckboxSelectMultiple,
        label="Skills Existentes"
    )

    class Meta:
        model = Funcionario
        fields = ['nome', 'cargo', 'skills']
