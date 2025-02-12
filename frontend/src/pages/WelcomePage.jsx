import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import shenronLogo from "../assets/images/shenron.png";
import "./WelcomePage.css";

const WelcomePage = () => {
    return (
        <div className="welcome-container">
            <Card className="glass-card">
                <Card.Body>
                    <div className="logo-container">
                        <img src={shenronLogo} alt="Shenron Logo" className="shenron-logo" />
                    </div>
                    <h2>¡Bienvenido a la App de Dragon Ball!</h2>
                    <p>Explora todos los personajes de Dragon Ball y guarda tus favoritos.</p>
                    <p><strong>Instrucciones:</strong></p>
                    <div className="instructions">
                    <p>1.-Para comenzar, inicia sesión o regístrate.</p>
                    <p>2.-Verás desplegados los 58 personajes disponibles</p>
                    <p>3.-Da click en la carta de tu personaje favorito para obtener información adicional</p>
                    <p>4.-Puedes buscar tu personaje por nombre en la barra de búsqueda</p>
                    <p>5.-Agrega y edita tu lista de favoritos</p>
                    <p>6.-Puedes filtrar favoritos dando click en el botón de la Navbar</p>
                    </div>
                    <div className="buttons">
                        <Link to="/login">
                            <Button className="button-secondary m-2">Iniciar Sesión</Button>
                        </Link>
                        <Link to="/register">
                            <Button className="button-primary m-2">Registrarse</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default WelcomePage;
