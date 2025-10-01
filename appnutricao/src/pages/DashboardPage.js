import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CalorieSummary from '../components/features/CalorieSummary';
import MealCard from '../components/features/MealCard';

function DashboardPage() {
    const [meals, setMeals] = useState({ cafeDaManha: [], almoco: [], janta: [], lanches: [] });
    const [isLoading, setIsLoading] = useState(true);

    const fetchDailyLog = useCallback(async () => {
        setIsLoading(true);
        const hoje = new Date().toISOString().split('T')[0];
        const usuario_id = 1;

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/diario/data/${usuario_id}/${hoje}`);
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.error('Erro ao buscar o resumo diário:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDailyLog();
    }, [fetchDailyLog]);

    const handleDeleteFood = async (registroId) => {
        if (!window.confirm("Tem certeza que deseja remover este alimento?")) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/diario/food/${registroId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Falha ao deletar o alimento.');
            }
            fetchDailyLog();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const hoje = new Date();
    const opcoesFormatacao = { weekday: 'long', day: 'numeric', month: 'long' };
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', opcoesFormatacao).format(hoje);

    const allFoods = Object.values(meals).flat();
    const totalCalorias = allFoods.reduce((total, food) => total + food.calorias, 0);
    const totalProteinas = allFoods.reduce((total, food) => total + food.proteinas, 0);
    const totalCarboidratos = allFoods.reduce((total, food) => total + food.carboidratos, 0);
    const totalGorduras = allFoods.reduce((total, food) => total + food.gorduras, 0);

    return (
        <div className="dashboard-page">
            <section className="resumo-section">
                <header className="dashboard-header">
                    <h1>Seu Resumo Diário</h1>
                    <p>{dataFormatada}</p>
                </header>
                <CalorieSummary 
                    totalCalorias={totalCalorias}
                    totalProteinas={totalProteinas}
                    totalCarboidratos={totalCarboidratos}
                    totalGorduras={totalGorduras}
                />
            </section>

            <section className="diario-section">
                <h2>Diário de Hoje</h2>
                {isLoading ? <p>Carregando...</p> : (
                    <div className="meals-grid">
                        <MealCard title="Café da Manhã" foods={meals.cafeDaManha} mealType="cafeDaManha" onDeleteFood={handleDeleteFood} />
                        <MealCard title="Almoço" foods={meals.almoco} mealType="almoco" onDeleteFood={handleDeleteFood} />
                        <MealCard title="Jantar" foods={meals.janta} mealType="janta" onDeleteFood={handleDeleteFood} />
                        <MealCard title="Lanches" foods={meals.lanches} mealType="lanches" onDeleteFood={handleDeleteFood} />
                    </div>
                )}
                {allFoods.length === 0 && !isLoading && (
                    <div className="empty-dashboard">
                        <p>Nenhuma refeição registrada. Comece adicionando seu café da manhã!</p>
                        <Link to="/adicionar/cafeDaManha" className="add-food-button">
                            + Adicionar Alimento
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}

export default DashboardPage;