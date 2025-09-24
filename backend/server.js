require('dotenv').config();

console.log('[DEBUG] EDAMAM_APP_ID:', process.env.EDAMAM_APP_ID);
console.log('[DEBUG] EDAMAM_APP_KEY:', process.env.EDAMAM_APP_KEY);

const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const foodsRoutes = require('./routes/foodsRoutes');


const app = express();
const PORT = 3001;

app.use(cors()); 
app.use(express.json()); 

app.get('/api', (req, res) => {
  res.json({ message: 'Olá! O backend está funcionando corretamente.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodsRoutes);

app.listen(PORT, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  try {
    const result = await db.query('SELECT NOW()');
    console.log('🐘 Conexão com o PostgreSQL bem-sucedida:', result.rows[0].now);
  } catch (err) {
    console.error('❌ Erro ao conectar com o PostgreSQL:', err.stack);
  }
});