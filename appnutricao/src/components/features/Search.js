// (Responsável: Lucas Durski)
import React, { useState } from 'react';
import { fetchNutritionData } from '../../services/api';

function Search() {
    const [query, setQuery] = useState('1 banana');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) {
            alert('Por favor, digite um alimento.');
            return;
        }
        setIsLoading(true);
        console.log(`Buscando por: "${query}"...`);

        const ingredients = [query];

        const nutritionData = await fetchNutritionData(ingredients);

        if (nutritionData) {
            console.log('✅ SUCESSO! Dados recebidos:', nutritionData);
            alert(`Calorias para "${query}": ${Math.round(nutritionData.calories)} kcal. Veja o console para mais detalhes.`);
        } else {
            console.error('❌ FALHA! Não foi possível obter os dados.');
            alert('Ocorreu um erro ao buscar os dados. Verifique o console.');
        }
        setIsLoading(false);
    };

    return (
        <div className="search-container" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: 1 fatia de pão"
                style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
                onClick={handleSearch}
                disabled={isLoading}
                style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }}
            >
                {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
        </div>
    );
}

export default Search;