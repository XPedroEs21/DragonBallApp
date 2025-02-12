from rest_framework import serializers
from .models import FavoriteCharacter

class FavoriteCharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteCharacter
        fields = ['id', 'character_id', 'character_name', 'character_image']
