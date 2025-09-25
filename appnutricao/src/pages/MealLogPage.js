import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MealCard from '../components/features/MealCard';
import { useAuth } from '../context/AuthContext';

function MealLogPage() {
    const [meals, setMeals] = useState({ cafeDaManha: [], almoco: [], janta: [], lanches: [] });
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    const fetchDailyLog = useCallback(async () => {
        if (!user) return;

        setIsLoading(true);
        const hoje = new Date().toISOString().split('T')[0];

        try {
            const response = await fetch(`http://localhost:3001/api/diario/data/${user.id}/${hoje}`);
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.error('Erro ao buscar o diário:', error);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchDailyLog();
    }, [fetchDailyLog]);

    const handleDeleteFood = async (registroId) => {
        if (!window.confirm("Tem certeza que deseja remover este alimento?")) return;

        try {
            const response = await fetch(`http://localhost:3001/api/diario/food/${registroId}`, {
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

    return (
        <div className="diario-page">
            <header className="dashboard-header">
                <h1>Diário de Hoje</h1>
                <p>{dataFormatada}</p>
            </header>

            {isLoading ? <p>Carregando seu diário...</p> : (
                <div className="meals-grid">
                    <MealCard title="Café da Manhã" foods={meals.cafeDaManha} mealType="cafeDaManha" onDeleteFood={handleDeleteFood} />
                    <MealCard title="Almoço" foods={meals.almoco} mealType="almoco" onDeleteFood={handleDeleteFood} />
                    <MealCard title="Jantar" foods={meals.janta} mealType="janta" onDeleteFood={handleDeleteFood} />
                    <MealCard title="Lanches" foods={meals.lanches} mealType="lanches" onDeleteFood={handleDeleteFood} />
                </div>
            )}
        </div>
    );
}

export default MealLogPage;