from django.contrib.auth.models import User  # ✅ Usar el modelo estándar de Django
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import FavoriteCharacter
from .serializers import FavoriteCharacterSerializer

# 📌 REGISTRO DE USUARIO
@api_view(["POST"])
def register_user(request):
    """
    Registrar un nuevo usuario.
    """
    data = request.data
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if User.objects.filter(username=username).exists():
        return Response({"error": "El nombre de usuario ya existe"}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()
    return Response({"message": "Usuario registrado con éxito"}, status=201)

# 📌 INICIO DE SESIÓN
@api_view(["POST"])
def login_user(request):
    """
    Iniciar sesión y devolver tokens JWT.
    """
    data = request.data
    username = data.get("username")
    password = data.get("password")

    user = authenticate(username=username, password=password)
    if user:
        login(request, user)  # ✅ Inicia sesión con el modelo `User`
        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }, status=200)

    return Response({"error": "Credenciales inválidas"}, status=401)

# 📌 CIERRE DE SESIÓN
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Cerrar sesión y eliminar tokens.
    """
    logout(request)  # Cierra la sesión en Django
    return Response({"message": "Sesión cerrada correctamente"}, status=200)

# 📌 OBTENER LISTA DE FAVORITOS
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_favorites(request):
    """
    Obtener la lista de favoritos del usuario autenticado.
    """
    try:
        favorites = FavoriteCharacter.objects.filter(user=request.user)
        serializer = FavoriteCharacterSerializer(favorites, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": "No se pudieron obtener los favoritos"}, status=500)

# 📌 AGREGAR PERSONAJE A FAVORITOS
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_favorite(request):
    """
    Agregar un personaje a favoritos.
    """
    data = request.data
    character_id = data.get("character_id")
    character_name = data.get("character_name")
    character_image = data.get("character_image")

    # Si ya existe, devolver el mensaje sin error
    favorite, created = FavoriteCharacter.objects.get_or_create(
        user=request.user,
        character_id=character_id,
        defaults={"character_name": character_name, "character_image": character_image}
    )

    if not created:
        return Response({"message": "El personaje ya está en favoritos"}, status=400)

    return Response({"message": "Favorito agregado correctamente"})

# 📌 ELIMINAR PERSONAJE DE FAVORITOS
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_favorite(request, character_id):
    """
    Eliminar un personaje de favoritos.
    """
    try:
        favorite = FavoriteCharacter.objects.get(user=request.user, character_id=character_id)
        favorite.delete()
        return Response({"message": "Favorito eliminado correctamente"})
    except FavoriteCharacter.DoesNotExist:
        return Response({"error": "El personaje no está en favoritos"}, status=404)
    except Exception as e:
        return Response({"error": "Error al eliminar el favorito"}, status=500)
