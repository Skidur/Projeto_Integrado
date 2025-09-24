import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddFoodPage() {
    const { mealType } = useParams();
    const navigate = useNavigate();

    const getTitle = (type) => {
        switch (type) {
            case 'cafeDaManha': return 'Café da Manhã';
            case 'almoco': return 'Almoço';
            case 'janta': return 'Jantar';
            case 'lanches': return 'Lanches';
            default: return 'Adicionar Alimento';
        }
    };

    const handleAddFood = (food) => {
        console.log('Adicionando:', food);
        alert(`${food.name} adicionado com sucesso!`);
        navigate('/dashboard');
    };

    return (
        <div className="add-food-page">
            <header className="page-header">
                <button onClick={() => navigate(-1)} className="back-button">&larr;</button>
                <h1>Adicionar ao {getTitle(mealType)}</h1>
            </header>

            <div className="search-container">
                <input type="text" placeholder="Buscar Alimento..." className="search-input" />
                <button className="search-button">Buscar</button>
            </div>

            <div className="search-results">
                <div className="food-list-item">
                    <span>100g de Banana</span>
                    <button onClick={() => handleAddFood({ nome: 'Banana', calorias: 89 })}>
                        +
                    </button>
                </div>
                <div className="food-list-item">
                    <span>1 fatia de Pão Integral</span>
                    <button onClick={() => handleAddFood({ nome: 'Pão Integral', calorias: 70 })}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddFoodPage;