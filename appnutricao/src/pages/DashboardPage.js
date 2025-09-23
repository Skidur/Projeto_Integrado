import React, { useState } from 'react';
import CalorieSummary from '../components/features/CalorieSummary';
import MealCard from '../components/features/MealCard';

function DashboardPage() {
    const [meals, setMeals] = useState({
        cafeDaManha: [
            { id: 1, nome: 'Café com leite', calorias: 60, proteinas: 5, carboidratos: 8, gorduras: 1 },
            { id: 2, nome: '2 fatias de pão integral', calorias: 140, proteinas: 8, carboidratos: 25, gorduras: 2 },
        ],
        almoco: [
            { id: 3, nome: '150g de Filé de Frango Grelhado', calorias: 240, proteinas: 45, carboidratos: 0, gorduras: 6 },
            { id: 4, nome: '200g de Arroz Branco', calorias: 260, proteinas: 5, carboidratos: 58, gorduras: 0.5 },
            { id: 5, nome: '1 concha de Feijão Carioca', calorias: 135, proteinas: 8, carboidratos: 24, gorduras: 1 },
        ],
        janta: [],
        lanches: [
            { id: 6, nome: '1 Maçã', calorias: 95, proteinas: 0.5, carboidratos: 25, gorduras: 0.3 },
        ],
    });

    const handleAddFood = (mealType, food) => {
        alert(`Adicionando ${food.nome} em ${mealType}. Funcionalidade a ser implementada.`);
    };

    const totalCalorias = Object.values(meals)
        .flat()
        .reduce((total, food) => total + food.calorias, 0);

    const totalProteinas = Object.values(meals)
        .flat()
        .reduce((total, food) => total + food.proteinas, 0);

    const totalCarboidratos = Object.values(meals)
        .flat()
        .reduce((total, food) => total + food.carboidratos, 0);

    const totalGorduras = Object.values(meals)
        .flat()
        .reduce((total, food) => total + food.gorduras, 0);

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1>Seu Resumo Diário</h1>
                <p>Olá, Lucas! Acompanhe aqui o seu progresso.</p>
            </header>

            <CalorieSummary 
                totalCalorias={totalCalorias}
                totalProteinas={totalProteinas}
                totalCarboidratos={totalCarboidratos}
                totalGorduras={totalGorduras}
            />

            <div className="meals-grid">
                <MealCard 
                    title="Café da Manhã" 
                    foods={meals.cafeDaManha} 
                    onAddFood={(food) => handleAddFood('cafeDaManha', food)} 
                />
                <MealCard 
                    title="Almoço" 
                    foods={meals.almoco} 
                    onAddFood={(food) => handleAddFood('almoco', food)} 
                />
                <MealCard 
                    title="Janta" 
                    foods={meals.janta} 
                    onAddFood={(food) => handleAddFood('janta', food)} 
                />
                <MealCard 
                    title="Lanches" 
                    foods={meals.lanches} 
                    onAddFood={(food) => handleAddFood('lanches', food)} 
                />
            </div>
        </div>
    );
}

export default DashboardPage;