// (Responsável: Lucas Felipe)
import React, { useState } from 'react';
import FoodListItem from '../ui/FoodListItem';

/**
 * Componente que representa um card de refeição (ex: Café da Manhã).
 * Gerencia a lista de alimentos para aquela refeição e calcula o subtotal.
 * @param {object} props - As propriedades do componente.
 * @param {string} props.title - O título da refeição (ex: 'Café da Manhã').
 * @param {Array<object>} props.foods - A lista de alimentos da refeição.
 */
const MealCard = ({ title, foods }) => {
  // Estado para controlar qual item da lista está com os detalhes expandidos
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Calcula o subtotal de calorias da refeição
  const subtotal = foods.reduce((acc, food) => acc + (food.nutrients.ENERC_KCAL || 0), 0);

  // Função para alternar a exibição dos detalhes de um alimento
  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 relative">
      <h3 className="font-bold text-xl text-gray-800 mb-4">{title}</h3>
      <ul className="relative z-0">
        {foods.map((food, index) => (
          <FoodListItem
            key={index}
            food={food}
            isExpanded={expandedIndex === index}
            onToggleDetails={() => toggleDetails(index)}
          />
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-lg font-bold text-gray-700">
          Subtotal: {Math.round(subtotal)} kcal
        </p>
      </div>
    </div>
  );
};

export default MealCard;
