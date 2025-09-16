const express = require('express');
const app = express();
const PORT = 3001;

app.get('/api', (req, res) => {
  res.json({ message: 'Olá! O backend está funcionando corretamente.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});