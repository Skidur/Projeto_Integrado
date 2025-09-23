import React from 'react';
import CalorieSummary from '../components/features/CalorieSummary';
import MealCard from '../components/features/MealCard';

function DashboardPage() {
    const mockFoods = {
        cafeDaManha: [{ id: 1, nome: 'Café com leite', calorias: 60 }],
        almoco: [{ id: 2, nome: 'Frango grelhado', calorias: 180 }],
        janta: [],
        lanches: [],
    };

    return (
        <div>
            <h2>Dashboard Nutricional</h2>
            <p>Acompanhe suas refeições e calorias do dia.</p>

            <CalorieSummary totalCalorias={240} />

            <div className="meals-grid">
                <MealCard title="Café da Manhã" foods={mockFoods.cafeDaManha} />
                <MealCard title="Almoço" foods={mockFoods.almoco} />
                <MealCard title="Janta" foods={mockFoods.janta} />
                <MealCard title="Lanches" foods={mockFoods.lanches} />
            </div>
        </div>
    );
}

export default DashboardPage;