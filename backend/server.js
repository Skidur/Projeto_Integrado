const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3001;

app.get('/api', (req, res) => {
  res.json({ message: 'Olá! O backend está funcionando corretamente.' });
});

app.listen(PORT, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  try {
    const result = await db.query('SELECT NOW()');
    console.log('🐘 Conexão com o PostgreSQL bem-sucedida:', result.rows[0].now);
  } catch (err) {
    console.error('❌ Erro ao conectar com o PostgreSQL:', err.stack);
  }
});