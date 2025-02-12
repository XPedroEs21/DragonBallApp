import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import shenronLogo from "../assets/images/shenron.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginPage.css";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
            
            // Guardar el token y los datos del usuario
            localStorage.setItem("token", response.data.access); // ✅ Ahora almacena correctamente el token
            localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Guarda los datos del usuario

            navigate("/home"); // Redirigir a la página principal
        } catch (err) {
            setError(err.response?.data?.error || "Error al iniciar sesión.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo-container">
                    <img src={shenronLogo} alt="Shenron Logo" className="shenron-logo" />
                </div>
                <h3 className="text-center">Iniciar sesión</h3>
                <p className="text-center">Accede para explorar tus personajes favoritos de Dragon Ball</p>
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            name="username" 
                            className="form-control" 
                            placeholder="🌟 Nombre de usuario"
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            className="form-control" 
                            placeholder="🔒 Contraseña"
                            onChange={handleChange} 
                            required 
                        />
                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button type="submit" className="login-button w-100">Iniciar sesión</button>
                </form>
                <p className="text-center small mt-2">¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
            </div>
        </div>
    );
};

export default Login;
