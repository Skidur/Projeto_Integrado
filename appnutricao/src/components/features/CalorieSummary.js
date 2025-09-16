// (Responsável: Lucas Felipe)
import React from 'react';

/**
 * Componente que mostra o resumo do dia, incluindo o total de calorias.
 * @param {object} props - As propriedades do componente.
 * @param {number} props.totalCalories - O total de calorias a ser exibido.
 */
const CalorieSummary = ({ totalCalories }) => {
  return (
    <div className="bg-indigo-50 p-6 rounded-2xl shadow-lg text-center">
      <h3 className="text-2xl font-bold text-indigo-800 mb-2">Resumo do Dia</h3>
      <p className="text-4xl font-extrabold text-indigo-900">
        {Math.round(totalCalories)} <span className="text-lg text-indigo-600 font-bold">kcal</span>
      </p>
    </div>
  );
};

export default CalorieSummary;
