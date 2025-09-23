const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const queryText = 'INSERT INTO usuarios(email, senha) VALUES($1, $2) RETURNING id, email';
        const values = [email, senhaHash];

        const result = await db.query(queryText, values);

        res.status(201).json({ 
            message: 'Usuário criado com sucesso!', 
            user: result.rows[0]
        });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: 'Este email já está cadastrado.' });
        }

        console.error('Erro no endpoint de cadastro:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;