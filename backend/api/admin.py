from django.contrib import admin
from .models import FavoriteCharacter

@admin.register(FavoriteCharacter)
class FavoriteCharacterAdmin(admin.ModelAdmin):
    list_display = ("user", "character_name", "character_id")
    search_fields = ("character_name", "user__username")
