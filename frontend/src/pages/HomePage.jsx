import React, { useState, useEffect } from "react";
import useFetchCharacters from "../hooks/useFetchCharacters";
import CharacterCard from "../components/CharacterCard";
import NavigationBar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../redux/favoritesSlice";
import { Container, Row, Col } from "react-bootstrap";

const HomePage = () => {
    const dispatch = useDispatch();
    const { characters = [], loading, error } = useFetchCharacters();
    const [search, setSearch] = useState("");
    const [showFavorites, setShowFavorites] = useState(false);
    const favorites = useSelector((state) => state.favorites.favorites) || [];

    useEffect(() => {
        dispatch(fetchFavorites()); // ✅ Cargar favoritos desde el backend
    }, [dispatch]);

    useEffect(() => {
        if (showFavorites) {
            dispatch(fetchFavorites()); // ✅ Recargar favoritos cuando se activa el filtro
        }
    }, [showFavorites, dispatch]);

    // 📌 Asegurar que `character.name` nunca sea `undefined`
    const filteredCharacters = (showFavorites
        ? favorites.map(fav => {
            const fullCharacter = characters.find(c => c.id === fav.character_id) || {}; // Buscar en characters
            return {
                id: fav.character_id,
                name: fav.character_name,
                image: fav.character_image,
                race: fullCharacter.race || "Desconocido",
                originPlanet: { name: fullCharacter.originPlanet?.name || "Desconocido" },
                gender: fullCharacter.gender || "Desconocido",
                ki: fullCharacter.ki || "Desconocido",
                maxKi: fullCharacter.maxKi || "Desconocido",
                affiliation: fullCharacter.affiliation || "Desconocido",
                description: fullCharacter.description || "No disponible",
                transformations: fullCharacter.transformations || [],
            };
        })
        : characters
    ).filter((character) =>
        (character.name || "").toLowerCase().includes(search.toLowerCase())
    );
    
    

    return (
        <>
            <NavigationBar onSearch={setSearch} onToggleFavorites={() => setShowFavorites(!showFavorites)} />
            <Container className="mt-5 pt-5">
                {loading && <p className="text-center">Cargando personajes...</p>}
                {error && <p className="text-danger text-center">Error al obtener personajes: {error}</p>}
                {filteredCharacters.length === 0 && !loading && (
                    <p className="text-center">No hay personajes que coincidan con la búsqueda.</p>
                )}
                <Row>
                    {filteredCharacters.map((character) => (
                        <Col key={character.character_id || character.id} md={4} className="mb-4">
                            <CharacterCard character={character} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default HomePage;
