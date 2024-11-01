from django.db import models

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
    nome = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nome

class Skill(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Funcionario(models.Model):
    nome = models.CharField(max_length=200)
    cargo = models.ForeignKey(Cargo, on_delete=models.SET_NULL, null=True)
    skill = models.ManyToManyField(Skill, through='EmployeeSkill')

    def __str__(self):
        return self.nome

class EmployeeSkill(models.Model):
    funcionario = models.ForeignKey(Funcionario, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    nivel = models.CharField(max_length=50, null=True, blank=True)  # Nível de habilidade, se necessário.

    class Meta:
        unique_together = ('funcionario', 'skill')  # Garante que não haja duplicação de skill por funcionário.
    