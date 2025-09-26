import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function MealDetailModal({ meal, onClose }) {
    if (!meal) return null;

    const mealMacros = {
        proteinas: meal.foods.reduce((acc, food) => acc + food.proteinas, 0),
        carboidratos: meal.foods.reduce((acc, food) => acc + food.carboidratos, 0),
        gorduras: meal.foods.reduce((acc, food) => acc + food.gorduras, 0),
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{meal.title}</h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <ul className="food-detail-list">
                        {meal.foods.length > 0 ? (
                            meal.foods.map((food, index) => (
                                <li key={index} className="food-detail-item">
                                    <span>{food.nome}</span>
                                    <span>{food.calorias} kcal</span>
                                </li>
                            ))
                        ) : (
                            <p>Nenhum alimento registrado nesta refeição.</p>
                        )}
                    </ul>
                    <div className="modal-summary">
                        <h3>Resumo da Refeição</h3>
                        <div className="modal-macros">
                            <span><strong>Proteínas:</strong> {Math.round(mealMacros.proteinas)}g</span>
                            <span><strong>Carboidratos:</strong> {Math.round(mealMacros.carboidratos)}g</span>
                            <span><strong>Gorduras:</strong> {Math.round(mealMacros.gorduras)}g</span>
                        </div>
                        <div className="modal-total-calories">
                            Total: <strong>{Math.round(meal.calories)} kcal</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function SummaryPage() {
    const [summary, setSummary] = useState({ totalCalorias: 0, totalProteinas: 0, totalCarboidratos: 0, totalGorduras: 0, mealSummaries: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const { user } = useAuth();

    const fetchSummary = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        const hoje = new Date().toISOString().split('T')[0];
        try {
            const response = await fetch(`http://localhost:3001/api/diario/data/${user.id}/${hoje}`);
            if (!response.ok) {
                throw new Error('Falha ao buscar dados.');
            }
            const data = await response.json();
            const allFoods = Object.values(data).flat();

            const mealKeyMapping = {
                cafeDaManha: 'Café da Manhã',
                almoco: 'Almoço',
                janta: 'Janta',
                lanches: 'Lanches'
            };

            const mealSummaries = Object.keys(mealKeyMapping).map(key => ({
                title: mealKeyMapping[key],
                foods: data[key] || [],
                calories: (data[key] || []).reduce((acc, food) => acc + (Number(food.calorias) || 0), 0)
            }));
            
            setSummary({
                totalCalorias: allFoods.reduce((acc, food) => acc + (Number(food.calorias) || 0), 0),
                totalProteinas: allFoods.reduce((acc, food) => acc + (Number(food.proteinas) || 0), 0),
                totalCarboidratos: allFoods.reduce((acc, food) => acc + (Number(food.carboidratos) || 0), 0),
                totalGorduras: allFoods.reduce((acc, food) => acc + (Number(food.gorduras) || 0), 0),
                mealSummaries
            });
        } catch (error) {
            console.error('Erro ao buscar o resumo diário:', error);
            setSummary({ totalCalorias: 0, totalProteinas: 0, totalCarboidratos: 0, totalGorduras: 0, mealSummaries: [] });
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    if (isLoading) { }
    if (summary.totalCalorias === 0) { }

    console.log("Dados do Resumo:", summary);

    return (
        <div className="summary-page">
            <div className="back-button-wrapper">
                <Link to="/" className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>
                    <span>Voltar ao Painel</span>
                </Link>
            </div>

            <div className="dashboard-header">
                <h1>Resumo Nutricional</h1>
                <p>Seu resumo de consumo para hoje.</p>
            </div>

            <div className="calorie-summary-card">
                <div className="summary-main">
                    <h2>{Math.round(summary.totalCalorias)}</h2>
                    <span>Calorias Totais</span>
                </div>
                <div className="summary-macros">
                    <div className="macro-item">
                        <span className="macro-value">{Math.round(summary.totalProteinas)}g</span>
                        <span className="macro-label">Proteínas</span>
                    </div>
                    <div className="macro-item">
                        <span className="macro-value">{Math.round(summary.totalCarboidratos)}g</span>
                        <span className="macro-label">Carboidratos</span>
                    </div>
                    <div className="macro-item">
                        <span className="macro-value">{Math.round(summary.totalGorduras)}g</span>
                        <span className="macro-label">Gorduras</span>
                    </div>
                </div>
            </div>

            <h2 className="section-title">Calorias por Refeição</h2>
            <div className="meals-grid">
                {summary.mealSummaries.map(meal => (
                    <div className="meal-summary-card" key={meal.title} onClick={() => setSelectedMeal(meal)}>
                        <h3>{meal.title}</h3>
                        <p>{Math.round(meal.calories)} kcal</p>
                    </div>
                ))}
            </div>

            <MealDetailModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
        </div>
    );
}

export default SummaryPage;