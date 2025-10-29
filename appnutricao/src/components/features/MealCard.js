import React from 'react';
import { Link } from 'react-router-dom';

function MealCard({ title, foods, mealType, onDeleteFood, selectedDate }) {
  const subtotalCalorias = foods.reduce((total, food) => total + food.calorias, 0);

  return (
    <div className="meal-card">
      <div className="meal-card-header">
        <h3>{title}</h3>
        <span>{Math.round(subtotalCalorias)} kcal</span>
      </div>

      <ul className="food-list">
        {foods.length > 0 ? (
          foods.map(food => (
            <li key={food.registro_id} className="food-list-item-summary">

              <div className="food-info-summary">
                <span className="food-time">{food.horario?.slice(0, 5)}</span> 
                <span className="food-name-summary">{food.nome}</span>
              </div>

              <div className="food-actions">
                <span className="food-calories-summary">{Math.round(food.calorias)} kcal</span>
                <button 
                  onClick={() => onDeleteFood(food.registro_id)} 
                  className="delete-food-btn"
                  title="Remover alimento"
                >
                  &times;
                </button>
              </div>

            </li>
          ))
        ) : (
          <p className="empty-list-text">Nenhum alimento adicionado.</p>
        )}
      </ul>

      <Link to={`/add-food/${mealType}/${selectedDate}`} className="add-food-button">+ Adicionar Alimento</Link>
    </div>
  );
}

export default MealCard;