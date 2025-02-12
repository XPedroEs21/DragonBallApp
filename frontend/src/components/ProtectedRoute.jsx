import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/authServices";

const ProtectedRoute = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
