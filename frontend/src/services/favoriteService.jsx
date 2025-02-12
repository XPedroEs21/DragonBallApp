import axios from "axios";
import { getToken } from "./authServices";

const API_URL = "http://127.0.0.1:8000/api/favorites/";

const config = () => ({
    headers: { Authorization: `Bearer ${getToken()}` },
});

// Obtener favoritos
export const getFavorites = async () => {
    try {
        const response = await axios.get(API_URL, config());
        return response.data;
    } catch (error) {
        console.error("Error obteniendo favoritos", error);
        return [];
    }
};

// Agregar favorito
export const addFavorite = async (character) => {
    try {
        await axios.post(`${API_URL}add/`, character, config());
    } catch (error) {
        console.error("Error agregando favorito", error);
    }
};

// Eliminar favorito
export const removeFavorite = async (character_id) => {
    try {
        await axios.delete(`${API_URL}remove/${character_id}/`, config());
    } catch (error) {
        console.error("Error eliminando favorito", error);
    }
};
