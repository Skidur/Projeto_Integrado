const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

const JWT_SECRET = 'seu_segredo_super_secreto_e_longo'; 

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

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const queryText = 'SELECT * FROM usuarios WHERE email = $1';
        const { rows } = await db.query(queryText, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const usuario = rows[0];

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const payload = {
            id: usuario.id,
            email: usuario.email,
        };

        const token = jwt.sign(
            payload, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: 'Login bem-sucedido!', 
            token: token,
            user: {
                id: usuario.id,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('Erro no endpoint de login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});


module.exports = router;