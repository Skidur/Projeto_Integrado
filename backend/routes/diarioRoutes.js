const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { usuario_id, alimento_id, mealType, data, quantidade, horario } = req.body;

    if (!usuario_id || !alimento_id || !mealType || !data) {
        return res.status(400).json({ message: 'Dados insuficientes para registrar o alimento.' });
    }

    try {
        await db.query('BEGIN');

        let refeicaoResult = await db.query(
            'SELECT id FROM diario_refeicoes WHERE usuario_id = $1 AND data = $2 AND tipo_refeicao = $3',
            [usuario_id, data, mealType]
        );

        let refeicaoId;
        if (refeicaoResult.rows.length > 0) {
            refeicaoId = refeicaoResult.rows[0].id;
        } else {
            const newRefeicaoResult = await db.query(
                'INSERT INTO diario_refeicoes (usuario_id, data, tipo_refeicao) VALUES ($1, $2, $3) RETURNING id',
                [usuario_id, data, mealType]
            );
            refeicaoId = newRefeicaoResult.rows[0].id;
        }

        await db.query(
            'INSERT INTO diario_alimentos (refeicao_id, alimento_id, quantidade_gramas, horario) VALUES ($1, $2, $3, $4)',
            [refeicaoId, alimento_id, quantidade || 100, horario || null]
        );
        
        await db.query('COMMIT');
        res.status(201).json({ message: 'Alimento adicionado com sucesso!' });

    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Erro ao adicionar alimento ao diário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

router.get('/data/:usuario_id/:data', async (req, res) => {
    const { usuario_id, data } = req.params;

    try {
        const query = `
            SELECT 
                dr.tipo_refeicao,
                da.registro_id, -- ID único do registro para poder deletar
                a.id as alimento_id,
                a.nome,
                a.calorias,
                a.proteinas,
                a.carboidratos,
                a.gorduras,
                da.quantidade_gramas,
                da.horario
            FROM diario_refeicoes dr
            JOIN diario_alimentos da ON dr.id = da.refeicao_id
            JOIN alimentos a ON da.alimento_id = a.id
            WHERE dr.usuario_id = $1 AND dr.data = $2
            ORDER BY da.horario; -- Ordena pela hora
        `;

        const { rows } = await db.query(query, [usuario_id, data]);

        const meals = { cafeDaManha: [], almoco: [], janta: [], lanches: [] };
        rows.forEach(row => {
            const mealType = row.tipo_refeicao;
            if (meals[mealType]) {
                meals[mealType].push({
                    registro_id: row.registro_id,
                    id: row.alimento_id,
                    nome: row.nome,
                    calorias: parseFloat(row.calorias),
                    proteinas: parseFloat(row.proteinas),
                    carboidratos: parseFloat(row.carboidratos),
                    gorduras: parseFloat(row.gorduras),
                    quantidade: parseFloat(row.quantidade_gramas),
                    horario: row.horario
                });
            }
        });
        res.json(meals);
    } catch (error) {
        console.error('Erro ao buscar diário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

router.delete('/food/:registro_id', async (req, res) => {
    const { registro_id } = req.params;
    try {
        const deleteResult = await db.query('DELETE FROM diario_alimentos WHERE registro_id = $1', [registro_id]);

        if (deleteResult.rowCount === 0) {
            return res.status(404).json({ message: 'Registro de alimento não encontrado.' });
        }

        res.status(200).json({ message: 'Alimento deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar alimento:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;