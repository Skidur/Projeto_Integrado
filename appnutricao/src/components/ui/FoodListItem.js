import React, { useState } from 'react';

function FoodListItem({ food }) {
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    return (
        <div className="food-list-item">
        <div className="food-item-main">
            <span className="food-item-name">{food.nome}</span>
            <div className="food-item-actions">
            <span className="food-item-calories">{Math.round(food.calorias)} kcal</span>
            <button 
                className="details-button" 
                onClick={() => setIsDetailsVisible(!isDetailsVisible)}
            >
                {isDetailsVisible ? '−' : '+'}
            </button>
            </div>
        </div>
        {isDetailsVisible && (
            <div className="food-item-details">
            <span>P: {Math.round(food.proteinas)}g</span>
            <span>C: {Math.round(food.carboidratos)}g</span>
            <span>G: {Math.round(food.gorduras)}g</span>
            </div>
        )}
        </div>
    );
}

export default FoodListItem;