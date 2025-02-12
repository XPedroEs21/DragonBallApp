import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptar cada solicitud para añadir el token JWT
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
