import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import shenronLogo from "../assets/images/shenron.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterPage.css";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }
        try {
            const response = await fetch("http://localhost:8000/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                navigate("/login");
            } else {
                setErrorMessage(data.message || "Error en el registro. Intenta con otro usuario o correo.");
            }
        } catch (error) {
            setErrorMessage("Error en la conexión. Inténtalo de nuevo.");
        }
    };

    const isFormValid = formData.username && formData.email && formData.password && formData.confirmPassword && (formData.password === formData.confirmPassword);

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="logo-container">
                    <img src={shenronLogo} alt="Shenron Logo" className="shenron-logo" />
                </div>
                <h3 className="text-center">Registro</h3>
                <p className="text-center">¡Estás a un paso de explorar tus personajes favoritos de Dragon Ball!</p>
                {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
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
                    <div className="mb-3">
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            placeholder="📩 Correo electrónico"
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
                    <div className="mb-3">
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            className="form-control" 
                            placeholder="🔒 Confirmar contraseña"
                            onChange={handleChange} 
                            onFocus={() => setConfirmPasswordFocused(true)}
                            required 
                        />
                        {confirmPasswordFocused && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <p className="text-danger small">Las contraseñas no coinciden</p>
                        )}
                    </div>
                    <button type="submit" className={`register-button w-100 ${!isFormValid ? "disabled-button" : ""}`} disabled={!isFormValid}>Registrarse</button>
                </form>
                <p className="text-center small mt-2">¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
            </div>
        </div>
    );
};

export default Register;
