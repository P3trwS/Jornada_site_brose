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