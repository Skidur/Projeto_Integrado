import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Importe o 'Link'
import CalorieSummary from '../components/features/CalorieSummary';
import MealCard from '../components/features/MealCard';

function DashboardPage() {
    const [meals, setMeals] = useState({
        cafeDaManha: [],
        almoco: [],
        janta: [],
        lanches: [],
    });

    const hoje = new Date();
    const opcoesFormatacao = { weekday: 'long', day: 'numeric', month: 'long' };
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', opcoesFormatacao).format(hoje);

    const allFoods = Object.values(meals).flat();
    const totalCalorias = allFoods.reduce((total, food) => total + food.calorias, 0);
    const totalProteinas = allFoods.reduce((total, food) => total + food.proteinas, 0);
    const totalCarboidratos = allFoods.reduce((total, food) => total + food.carboidratos, 0);
    const totalGorduras = allFoods.reduce((total, food) => total + food.gorduras, 0);

    const temComidaRegistrada = allFoods.length > 0;

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1>Seu Resumo Diário</h1>
                <p>{dataFormatada}</p>
            </header>

            {temComidaRegistrada ? (
                <>
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
                            mealType="cafeDaManha"
                        />
                        <MealCard 
                            title="Almoço" 
                            foods={meals.almoco} 
                            mealType="almoco"
                        />
                        <MealCard 
                            title="Jantar" 
                            foods={meals.janta} 
                            mealType="janta"
                        />
                        <MealCard 
                            title="Lanches" 
                            foods={meals.lanches} 
                            mealType="lanches"
                        />
                    </div>
                </>
            ) : (
                <div className="empty-dashboard">
                    <h2>Bem-vindo(a)!</h2>
                    <p>Parece que você ainda não registrou nenhuma refeição hoje.</p>
                    <Link to="/adicionar/cafeDaManha" className="add-food-button">
                        + Adicionar seu Café da Manhã
                    </Link>
                </div>
            )}
        </div>
    );
}

export default DashboardPage;