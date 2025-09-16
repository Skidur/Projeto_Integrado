import React, { useState, useEffect } from 'react';

// Importando os componentes (ajustado para a sua estrutura de pastas)
import Header from './components/ui/Header';
import Search from './components/features/Search';
import CalorieSummary from './components/features/CalorieSummary';
import MealCard from './components/features/MealCard';

// Funções de utilidade para localStorage, responsabilidade do Lucas Durski
const storage = {
  save: (data) => {
    try {
      localStorage.setItem('nutritionAppData', JSON.stringify(data));
    } catch (e) {
      console.error('Erro ao salvar no localStorage', e);
    }
  },
  load: () => {
    try {
      const data = localStorage.getItem('nutritionAppData');
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Erro ao carregar do localStorage', e);
      return {};
    }
  }
};

/**
 * Componente principal da aplicação.
 * Gerencia o estado global do dia e une todas as outras peças.
 */
const App = () => {
  const [meals, setMeals] = useState({});

  useEffect(() => {
    const savedData = storage.load();
    if (Object.keys(savedData).length > 0) {
      setMeals(savedData);
    } else {
      // Se não houver dados salvos, inicializa as refeições
      setMeals({
        'Café da Manhã': [],
        'Almoço': [],
        'Janta': [],
        'Lanche': []
      });
    }
  }, []);

  const handleAddFood = (food, mealName) => {
    const newMeals = { ...meals };
    newMeals[mealName] = [...newMeals[mealName], {
      foodName: food.label,
      nutrients: food.nutrients,
    }];
    setMeals(newMeals);
    storage.save(newMeals);
  };

  const totalCalories = Object.values(meals).flat().reduce((acc, food) => acc + (food.nutrients.ENERC_KCAL || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Lucas Moraes - Header */}
        <Header />

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lucas Durski - Search Component */}
          <div className="md:col-span-2">
            {/* O SearchComponent precisa ser conectado a um mealcard. Aqui, ele adiciona ao "Café da Manhã" para fins de demonstração */}
            <Search onSelectFood={(food) => handleAddFood(food, 'Café da Manhã')} />
          </div>

          {/* Lucas Felipe - Calorie Summary */}
          <div className="md:col-span-1">
            <CalorieSummary totalCalories={totalCalories} />
          </div>
        </main>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Lucas Felipe - Meal Cards */}
          {Object.entries(meals).map(([title, foods]) => (
            <MealCard key={title} title={title} foods={foods} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
