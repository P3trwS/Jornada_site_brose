from django.db import models
from django.db import models
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from typing import Any

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Respostas(models.Model):
    pergunta1 = models.CharField(max_length=255)
    # pergunta2 = models.CharField(max_length=255)
    # Adicione os campos conforme necessário

    def __str__(self):
        return f'Resposta: {self.pergunta1}'

class Cargo(models.Model):
    nome: str = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.nome


class Skill(models.Model):
    nome: str = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.nome


class Funcionario(models.Model):
    nome: str = models.CharField(max_length=200)
    cargo: Any = models.ForeignKey(Cargo, on_delete=models.SET_NULL, null=True)
    skills: any = models.ManyToManyField(Skill, through='EmployeeSkill')

    def __str__(self) -> str:
        return self.nome


class EmployeeSkill(models.Model):
    funcionario: Any = models.ForeignKey(Funcionario, on_delete=models.CASCADE)
    skill: Any = models.ForeignKey(Skill, on_delete=models.CASCADE)
    nivel: str = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        unique_together = ('funcionario', 'skill')  # Garante unicidade de skill por funcionário
