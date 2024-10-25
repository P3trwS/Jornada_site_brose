from django.db import models

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Respostas(models.Model):
    pergunta1 = models.CharField(max_length=255)
    pergunta2 = models.CharField(max_length=255)
    # Adicione os campos conforme necessário

    def __str__(self):
        return f'Resposta: {self.pergunta1}, {self.pergunta2}'

class Funcionario(models.Model):
    nome = models.CharField(max_length=100)
    cargo = models.CharField(max_length=50)
    data_contratacao = models.DateField()
    skill = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nome
