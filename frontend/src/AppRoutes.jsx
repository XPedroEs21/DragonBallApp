import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Register from "./pages/RegisterPage.jsx";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute"; // To protect pages if user isn't logged in

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Página de bienvenida */}
                <Route path="/" element={<WelcomePage />} />

                {/* Registro y login */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                </Route>

                {/* Redirección a login si la ruta no existe */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
