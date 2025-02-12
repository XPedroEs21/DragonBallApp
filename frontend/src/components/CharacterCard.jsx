import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import { Card, Button, Modal } from "react-bootstrap";
import "./CharacterCard.css";

const CharacterCard = ({ character }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.favorites);
    const isFavorite = favorites.some((fav) => fav.character_id === character.id);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Card className="character-card" onClick={() => setShowModal(true)}>
                <Card.Img variant="top" src={character.image} alt={character.name} />
                <Card.Body>
                    <Card.Title>{character.name}</Card.Title>
                    <Card.Text><strong>Raza:</strong> {character.race || "Desconocido"}</Card.Text>
                    <Card.Text><strong>Planeta:</strong> {character.originPlanet?.name || "Desconocido"}</Card.Text>
                    <Button
                        variant={isFavorite ? "danger" : "primary"}
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(toggleFavorite(character));
                        }}
                    >
                        {isFavorite ? "Eliminar de Favoritos" : "Añadir a Favoritos"}
                    </Button>
                </Card.Body>
            </Card>

            {/* Modal de detalles del personaje */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{character.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="character-details">
                        <img src={character.image} alt={character.name} className="character-modal-image small-image" />
                        <div className="character-info">
                            <p><strong>Descripción:</strong> {character.description || "No disponible"}</p>
                            <p><strong>Raza:</strong> {character.race}</p>
                            <p><strong>Género:</strong> {character.gender}</p>
                            <p><strong>Ki:</strong> {character.ki}</p>
                            <p><strong>Max Ki:</strong> {character.maxKi}</p>
                            <p><strong>Afiliación:</strong> {character.affiliation || "Desconocida"}</p>
                            <p><strong>Planeta de Origen:</strong> {character.originPlanet?.name || "Desconocido"}</p>
                            <p><strong>Transformaciones:</strong></p>
                            {character.transformations && character.transformations.length > 0 ? (
                                <ul>
                                    {character.transformations.map((transformation, index) => (
                                        <li key={index}>{transformation.name || transformation}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No tiene transformaciones registradas</p>
                            )}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Regresar
                    </Button>
                    <Button
                        variant={isFavorite ? "danger" : "primary"}
                        onClick={() => dispatch(toggleFavorite(character))}
                    >
                        {isFavorite ? "Eliminar de Favoritos" : "Añadir a Favoritos"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CharacterCard;
