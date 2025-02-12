import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; 

// Iniciar sesión
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, { username, password });

        if (response.data.access) {
            localStorage.setItem("token", response.data.access);  // ✅ Guarda el token correctamente
            localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Guarda info del usuario
        }

        return response.data;
    } catch (error) {
        console.error("Error en login:", error);
        throw error.response?.data?.error || "Error al iniciar sesión";
    }
};

// Cerrar sesión
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// Obtener el usuario autenticado
export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

// Obtener el token almacenado
export const getToken = () => {
    return localStorage.getItem("token");
};
