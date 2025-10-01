const express = require('express');
const db = require('../db');
const axios = require('axios');
const router = express.Router();

const API_URL = 'https://api.edamam.com/api/food-database/v2/parser';

router.get('/', async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ message: 'Um termo de busca é obrigatório.' });
    }

    try {
        const localQuery = "SELECT * FROM alimentos WHERE nome ILIKE $1 LIMIT 10";
        const localResult = await db.query(localQuery, [`%${q}%`]);

        if (localResult.rows.length > 0) {
            console.log(`✅ Dados encontrados no cache local para: "${q}"`);
            return res.json(localResult.rows);
        }

        console.log(`🔍 Nenhum cache encontrado. Buscando na API da Edamam para: "${q}"`);
        const edamamResponse = await axios.get(API_URL, {
            params: {
                ingr: q,
                app_id: process.env.EDAMAM_APP_ID,
                app_key: process.env.EDAMAM_APP_KEY,
            }
        });

        if (!edamamResponse.data.hints || edamamResponse.data.hints.length === 0) {
            return res.json([]);
        }

        const foodsFromApi = edamamResponse.data.hints.map(item => {
            const food = item.food;
            const nutrients = food.nutrients;
            return {
                id: null,
                nome: food.label,
                calorias: nutrients.ENERC_KCAL || 0,
                proteinas: nutrients.PROCNT || 0,
                carboidratos: nutrients.CHOCDF || 0,
                gorduras: nutrients.FAT || 0,
                porcao_padrao_gramas: 100
            };
        });

        for (const food of foodsFromApi) {
            const insertQuery = `
                INSERT INTO alimentos (nome, calorias, proteinas, carboidratos, gorduras, porcao_padrao_gramas) 
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (nome) DO NOTHING;
            `;
            await db.query(insertQuery, [food.nome, food.calorias, food.proteinas, food.carboidratos, food.gorduras, food.porcao_padrao_gramas]);
        }

        const finalResult = await db.query(localQuery, [`%${q}%`]);
        res.json(finalResult.rows);

    } catch (error) {
        console.error('Erro ao buscar alimentos:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar alimentos.' });
    }
});

module.exports = router;