import React, { useState, useEffect, useCallback } from 'react';
import CalorieSummary from '../components/features/CalorieSummary';
import { useAuth } from '../context/AuthContext';

function SummaryPage() {
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    const fetchSummary = useCallback(async () => {
        if (!user) return;

        setIsLoading(true);
        const hoje = new Date().toISOString().split('T')[0];

        try {
            const response = await fetch(`http://localhost:3001/api/diario/data/${user.id}/${hoje}`);
            const data = await response.json();

            const allFoods = Object.values(data).flat();
            const totalCalorias = allFoods.reduce((acc, food) => acc + food.calorias, 0);
            const totalProteinas = allFoods.reduce((acc, food) => acc + food.proteinas, 0);
            const totalCarboidratos = allFoods.reduce((acc, food) => acc + food.carboidratos, 0);
            const totalGorduras = allFoods.reduce((acc, food) => acc + food.gorduras, 0);

            const mealSummaries = Object.keys(data).map(mealType => ({
                title: mealType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
                calories: data[mealType].reduce((acc, food) => acc + food.calorias, 0)
            }));

            setSummary({
                totalCalorias,
                totalProteinas,
                totalCarboidratos,
                totalGorduras,
                mealSummaries
            });

        } catch (error) {
            console.error('Erro ao buscar o resumo diário:', error);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    if (isLoading) {
        return <p>Carregando resumo...</p>;
    }

    if (!summary || summary.totalCalorias === 0) {
        return (
            <div className="summary-page">
                <h1>Resumo Nutricional</h1>
                <p>Nenhum alimento registrado hoje. Adicione sua primeira refeição no Diário!</p>
            </div>
        )
    }

    return (
        <div className="summary-page">
            <h1>Resumo Nutricional</h1>
            <CalorieSummary 
                totalCalorias={summary.totalCalorias}
                totalProteinas={summary.totalProteinas}
                totalCarboidratos={summary.totalCarboidratos}
                totalGorduras={summary.totalGorduras}
            />

            <div className="meal-summary-grid">
                <h2>Calorias por Refeição</h2>
                {summary.mealSummaries.map(meal => (
                    <div className="meal-summary-card" key={meal.title}>
                        <h3>{meal.title}</h3>
                        <p>{Math.round(meal.calories)} kcal</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SummaryPage;