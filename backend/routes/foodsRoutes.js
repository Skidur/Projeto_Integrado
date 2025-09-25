const express = require('express');
const db = require('../db');
const axios = require('axios');
const router = express.Router();

const API_URL = 'https://api.edamam.com/api/food-database/v2/parser';

router.get('/', async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({ message: 'Um termo de busca é obrigatório.' });
    }

    try {
        const localQuery = "SELECT * FROM alimentos WHERE nome ILIKE $1 LIMIT 10";
        const localResult = await db.query(localQuery, [`%${search}%`]);

        if (localResult.rows.length > 0) {
            console.log(`✅ Dados encontrados no cache local para: "${search}"`);
            return res.json(localResult.rows);
        }

        console.log(`🔍 Nenhum cache encontrado. Buscando na API da Edamam para: "${search}"`);
        const edamamResponse = await axios.get(API_URL, {
            params: {
                ingr: search,
                app_id: process.env.EDAMAM_APP_ID,
                app_key: process.env.EDAMAM_APP_KEY,
            }
        });
        console.log('RESPOSTA CRUA DA EDAMAM:', JSON.stringify(edamamResponse.data, null, 2))

        const foodsFromApi = edamamResponse.data.hints.map(item => {
            const food = item.food;
            const nutrients = food.nutrients;
            return {
                nome: food.label,
                calorias: nutrients.ENERC_KCAL || 0,
                proteinas: nutrients.PROCNT || 0,
                carboidratos: nutrients.CHOCDF || 0,
                gorduras: nutrients.FAT || 0,
            };
        });

        for (const food of foodsFromApi) {
            const insertQuery = `
                INSERT INTO alimentos (nome, calorias, proteinas, carboidratos, gorduras) 
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (nome) DO NOTHING; -- Não faz nada se o alimento já existir
            `;
            await db.query(insertQuery, [food.nome, food.calorias, food.proteinas, food.carboidratos, food.gorduras]);
        }

        res.json(foodsFromApi);

    } catch (error) {
        console.error('Erro ao buscar alimentos:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar alimentos.' });
    }
});

module.exports = router;