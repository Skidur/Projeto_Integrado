import React from 'react';

function CalorieSummary({ totalCalorias, totalProteinas, totalCarboidratos, totalGorduras }) {
  return (
    <div className="calorie-summary">
      <div className="summary-total">
        <h2>{Math.round(totalCalorias)}</h2>
        <p>Calorias Totais</p>
      </div>
      <div className="summary-macros">
        <div className="macro-item">
          <span className="macro-value">{Math.round(totalProteinas)}g</span>
          <span className="macro-label">Proteínas</span>
        </div>
        <div className="macro-item">
          <span className="macro-value">{Math.round(totalCarboidratos)}g</span>
          <span className="macro-label">Carboidratos</span>
        </div>
        <div className="macro-item">
          <span className="macro-value">{Math.round(totalGorduras)}g</span>
          <span className="macro-label">Gorduras</span>
        </div>
      </div>
    </div>
  );
}

export default CalorieSummary;