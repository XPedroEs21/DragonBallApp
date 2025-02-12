from django.contrib.auth.models import User
from django.db import models

class FavoriteCharacter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Relación con el usuario
    character_id = models.IntegerField()  # ID del personaje de la API externa
    character_name = models.CharField(max_length=100)  # Nombre del personaje
    character_image = models.URLField()  # Imagen del personaje

    class Meta:
        app_label = "api"  
    def __str__(self):
        return f"{self.user.username} - {self.character_name}"