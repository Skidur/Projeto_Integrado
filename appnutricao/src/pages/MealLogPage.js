import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Corrigido
import MealCard from '../components/features/MealCard';
import { useAuth } from '../context/AuthContext';

function MealLogPage() {
    const [meals, setMeals] = useState({ cafeDaManha: [], almoco: [], janta: [], lanches: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchDailyLog = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/diario/data/${user.id}/${selectedDate}`); 
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.error('Erro ao buscar o diário:', error);
            setMeals({ cafeDaManha: [], almoco: [], janta: [], lanches: [] });
        } finally {
            setIsLoading(false);
        }
    }, [user, selectedDate]);

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

    const displayDate = new Date(selectedDate + 'T00:00:00');
    const opcoesFormatacao = { weekday: 'long', day: 'numeric', month: 'long' };
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', opcoesFormatacao).format(displayDate);

    return (
        <div className="summary-page">
            <header className="dashboard-header">
                <h1>Diário Alimentar</h1>
                <p>{dataFormatada}</p>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="date-picker-diario"
                />
                <button onClick={() => navigate('/dashboard')} className="btn-voltar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                    Voltar
                </button>
            </header>

            {isLoading ? <p>Carregando seu diário...</p> : (
                <div className="meals-grid">
                    <MealCard title="Café da Manhã" foods={meals.cafeDaManha} mealType="cafeDaManha" onDeleteFood={handleDeleteFood} selectedDate={selectedDate} />
                    <MealCard title="Almoço" foods={meals.almoco} mealType="almoco" onDeleteFood={handleDeleteFood} selectedDate={selectedDate} />
                    <MealCard title="Jantar" foods={meals.janta} mealType="janta" onDeleteFood={handleDeleteFood} selectedDate={selectedDate} />
                    <MealCard title="Lanches" foods={meals.lanches} mealType="lanches" onDeleteFood={handleDeleteFood} selectedDate={selectedDate} />
                </div>
            )}
        </div>
    );
}

export default MealLogPage;