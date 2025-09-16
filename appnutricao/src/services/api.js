// (Responsável: Lucas Durski)
const APP_ID = 'c3fad2f7';
const APP_KEY = 'b635b105f92c9dabe075119d854bc36c';
const API_URL = 'https://api.edamam.com/api/nutrition-details';

export async function fetchNutritionData(ingredients) {
    const payload = {
        ingr: ingredients,
    };

    const url = `${API_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Dados recebidos da API:", data);
        return data;

    } catch (error) {
        console.error("Falha ao buscar dados nutricionais:", error);
        return null;
    }
}