import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function AddFoodPage() {
    const { mealType } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [horario, setHorario] = useState(new Date().toTimeString().slice(0, 5));

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        const fetchFoods = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/foods?q=${searchTerm}`);
                
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

    const handleAddFood = async (food) => {
        if (!user) {
            alert("Você precisa estar logado para adicionar alimentos.");
            navigate('/login');
            return;
        }

        const registro = {
            usuario_id: user.id,
            alimento_id: food.id,
            tipo_refeicao: mealType,
            data: new Date().toISOString().split('T')[0],
            quantidade_gramas: food.porcao_padrao_gramas || 100,
            horario: horario
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/diario/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registro)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao adicionar alimento.');
            }

            console.log('Alimento adicionado com sucesso!');
            navigate('/diario');

        } catch (error) {
            console.error('Erro ao salvar alimento:', error);
            alert(`Erro: ${error.message}`);
        }
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
            <div className="add-food-page-top-bar">
                <button onClick={() => navigate(-1)} className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                    <span>Voltar</span>
                </button>
            </div>

            <header className="page-header">
                <h1>Adicionar ao {getTitle(mealType)}</h1>
                <div className="time-input-container">
                    <label htmlFor="horario">Horário:</label>
                    <input
                        type="time"
                        id="horario"
                        className="time-input"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                    />
                </div>
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
                    const nomeArray = food.nome.split(',');
                    const nomePrincipal = nomeArray[0];
                    const descricao = nomeArray.slice(1).join(',').trim();

                    return (
                        <div className="food-list-item" key={food.id || food.nome}>
                            <div className="food-info">
                                <span className="food-name">{nomePrincipal}</span>
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