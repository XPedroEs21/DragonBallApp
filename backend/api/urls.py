from django.urls import path
from .views import login_user, logout_view, register_user,get_favorites, add_favorite, remove_favorite
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    
    path("register/", register_user, name="register"),
    path('login/', login_user, name="login"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', logout_view, name="logout"),

    path("favorites/", get_favorites, name="get_favorites"),
    path("favorites/add/", add_favorite, name="add_favorite"),
    path("favorites/remove/<int:character_id>/", remove_favorite, name="remove_favorite"),
]
