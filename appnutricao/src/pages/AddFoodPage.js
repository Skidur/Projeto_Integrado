import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddFoodPage() {
    const { mealType } = useParams();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        const fetchFoods = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/foods?search=${searchTerm}`);
                if (!response.ok) {
                    throw new Error('A resposta da rede não foi OK');
                }
                const data = await response.json();
                setResults(data);
            } catch (err) {
                console.error("Erro ao buscar alimentos:", err);
                setError('Não foi possível buscar os alimentos. Tente novamente.');
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchFoods();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleAddFood = (food) => {
        console.log('Adicionando:', food, 'na refeição:', mealType);
        alert(`${food.nome} foi selecionado! Agora precisamos salvar.`);
        navigate('/dashboard');
    };

    const getTitle = (type) => {
        const titles = {
            cafeDaManha: 'Café da Manhã',
            almoco: 'Almoço',
            janta: 'Jantar',
            lanches: 'Lanches',
        };
        return titles[type] || 'Adicionar Alimento';
    };

    return (
        <div className="add-food-page">
            <header className="page-header">
                <button onClick={() => navigate(-1)} className="back-button">&larr;</button>
                <h1>Adicionar ao {getTitle(mealType)}</h1>
            </header>

            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Digite o nome de um alimento..." 
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="search-results">
                {isLoading && <p className="loading-message">Buscando...</p>}
                {error && <p className="error-message">{error}</p>}
                
                {!isLoading && !error && results.map(food => {
                    // --- LÓGICA DE FORMATAÇÃO DO NOME ---
                    const nomeArray = food.nome.split(',');
                    const nomePrincipal = nomeArray[0];
                    const descricao = nomeArray.slice(1).join(',').trim();

                    return (
                        <div className="food-list-item" key={food.id || food.nome}>
                            <div className="food-info">
                                <span className="food-name">{nomePrincipal}</span>
                                {/* Só mostra a descrição se ela existir */}
                                {descricao && <span className="food-details">{descricao}</span>} 
                            </div>
                            <div className="food-macros">
                                <span className="food-details">
                                    {Math.round(food.calorias)} kcal
                                </span>
                            </div>
                            <button onClick={() => handleAddFood(food)} className="add-button" title="Adicionar este alimento">
                                +
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AddFoodPage;