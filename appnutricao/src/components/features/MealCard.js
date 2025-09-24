import React from 'react';
import FoodListItem from '../ui/FoodListItem';
import { Link } from 'react-router-dom';

function MealCard({ title, foods, mealType }) {
  const subtotalCalorias = foods.reduce((total, food) => total + food.calorias, 0);

  return (
    <div className="meal-card">
      <div className="meal-card-header">
        <h3>{title}</h3>
        <span>{Math.round(subtotalCalorias)} kcal</span>
      </div>
      
      <div className="food-list">
        {foods.length > 0 ? (
          foods.map(food => <FoodListItem key={food.id} food={food} />)
        ) : (
          <p className="empty-list-text">Nenhum alimento adicionado.</p>
        )}
      </div>

      <Link to={`/adicionar/${mealType}`} className="add-food-button">
        + Adicionar Alimento
      </Link>
    </div>
  );
}

export default MealCard;