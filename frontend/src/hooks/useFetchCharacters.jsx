import { useState, useEffect } from "react";

const useFetchCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                let allCharacters = [];
                let currentPage = 1;
                const limit = 10;
                let totalPages = 1;

                while (currentPage <= totalPages) {
                    const response = await fetch(`https://dragonball-api.com/api/characters?page=${currentPage}&limit=${limit}`);
                    const data = await response.json();
                    totalPages = data.meta.totalPages;

                    // Obtener detalles de cada personaje individualmente
                    const detailedCharacters = await Promise.all(
                        data.items.map(async (char) => {
                            const charDetailsResponse = await fetch(`https://dragonball-api.com/api/characters/${char.id}`);
                            const charDetails = await charDetailsResponse.json();
                            return {
                                ...char,
                                transformations: charDetails.transformations || [], // ✅ Asegurar que existan transformaciones
                                originPlanet: charDetails.originPlanet || { name: "Desconocido" }, // ✅ Asegurar el planeta
                            };
                        })
                    );

                    allCharacters = [...allCharacters, ...detailedCharacters];
                    currentPage++;
                }

                setCharacters(allCharacters);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener personajes:", error);
                setError("Error al obtener los personajes");
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    return { characters, loading, error };
};

export default useFetchCharacters;
