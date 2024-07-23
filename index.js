const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Servir o index.html na raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/check-token', async (req, res) => {
  const { token, tokenType } = req.body;
  let authHeader = '';

  if (tokenType === 'bot') {
    authHeader = `Bot ${token}`;
  } else if (tokenType === 'user') {
    authHeader = `Bearer ${token}`;
  }

  try {
    const response = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: { 'Authorization': authHeader }
    });
    if (response.status === 200) {
      res.json({ status: 'success', message: 'O token está ativo.' });
    } else {
      res.json({ status: 'error', message: 'O token não está ativo.' });
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      res.json({ status: 'error', message: 'O token é inválido ou expirou.' });
    } else {
      res.json({ status: 'error', message: 'Erro ao verificar o token: ' + (error.response ? error.response.data.message : error.message) });
    }
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
