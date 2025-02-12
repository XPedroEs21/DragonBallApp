import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFavorites, addFavorite, removeFavorite } from "../services/favoriteService";

// 📌 Obtener favoritos al cargar la aplicación
export const fetchFavorites = createAsyncThunk("favorites/fetchFavorites", async () => {
    try {
        return await getFavorites();
    } catch (error) {
        console.error("Error obteniendo favoritos:", error);
        return []; // ✅ En caso de error, devolver un array vacío
    }
});

// 📌 Agregar o quitar favorito
export const toggleFavorite = createAsyncThunk("favorites/toggleFavorite", async (character, { getState }) => {
    const { favorites } = getState().favorites;
    const isFavorite = favorites.some((fav) => fav.character_id === character.id);

    try {
        if (isFavorite) {
            await removeFavorite(character.id);
        } else {
            await addFavorite({
                character_id: character.id,
                character_name: character.name,
                character_image: character.image,
            });
        }

        return await getFavorites(); // ✅ Recargar favoritos después del cambio
    } catch (error) {
        console.error("Error al actualizar favoritos:", error);
        return favorites; // ✅ Si hay error, devolver la lista actual sin cambios
    }
});

// 📌 Reducer para manejar favoritos en Redux
const favoritesSlice = createSlice({
    name: "favorites",
    initialState: { favorites: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload || []; // ✅ Si `payload` es `undefined`, usar un array vacío
            })
            .addCase(fetchFavorites.rejected, (state) => {
                state.loading = false;
            })
            .addCase(toggleFavorite.pending, (state) => {
                state.loading = true;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload || [];
            })
            .addCase(toggleFavorite.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default favoritesSlice.reducer;
