import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar, Container, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { logout, getUser } from "../services/authServices"; // Asegúrate de que la ruta es correcta
import { useNavigate } from "react-router-dom";
import shenronLogo from "../assets/images/shenron.png";
import "./Navbar.css";

const NavigationBar = ({ onSearch, onToggleFavorites }) => {
    const [search, setSearch] = useState(""); // Estado para manejar la búsqueda
    const favoritesCount = useSelector((state) => state.favorites.favorites.length);
    const user = getUser(); // Obtener usuario almacenado en localStorage
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Navbar fixed="top" className="navbar">
            <Container className="d-flex justify-content-between align-items-center">
                {/* Logo y nombre */}
                <div className="d-flex align-items-center">
                    <img src={shenronLogo} alt="Shenron Logo" className="navbar-logo" />
                    <span className="ms-2 fw-bold text-white">Dragon Ball App</span>
                </div>

                {/* Barra de búsqueda */}
                <Form className="d-flex w-50">
                    <FormControl
                        type="search"
                        placeholder="Buscar personaje..."
                        className="me-2"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            onSearch(e.target.value); // Llama a la función de búsqueda
                        }}
                    />
                </Form>

                {/* Botón de favoritos y usuario */}
                <div className="d-flex align-items-center">
                    <Button variant="danger" className="me-3" onClick={onToggleFavorites}>
                        Favoritos ({favoritesCount})
                    </Button>

                    {/* Mostrar usuario y logout */}
                    {user ? (
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {user.username}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Button variant="light" onClick={() => navigate("/login")}>
                            Iniciar sesión
                        </Button>
                    )}
                </div>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
