const { Client } = require('discord.js-selfbot-v13');
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// Endpoint para verificar o token de usuário
app.post('/check-user-token', async (req, res) => {
  const token = req.body.token;

  try {
    const userClient = new Client({ checkUpdate: false });
    await userClient.login(token);
    res.json({ status: 'success', message: 'O token do usuário está ativo.' });
    userClient.destroy(); // Destrói a instância do cliente após a verificação
  } catch (error) {
    res.json({ status: 'error', message: 'O token do usuário é inválido ou expirou.' });
  }
});

// Endpoint para obter informações do usuário
app.post('/get-user-info', async (req, res) => {
  const token = req.body.token;

  try {
    const userClient = new Client({ checkUpdate: false });
    await userClient.login(token);
    const userInfo = {
      id: userClient.user.id,
      username: userClient.user.username,
      discriminator: userClient.user.discriminator,
      avatar: userClient.user.avatarURL(),
    };
    userClient.destroy(); // Destrói a instância do cliente após a verificação
    res.json({ status: 'success', info: userInfo });
  } catch (error) {
    res.json({ status: 'error', message: 'Não foi possível obter informações do usuário.' });
  }
});

// Endpoint para verificar o token de bot
app.post('/check-bot-token', async (req, res) => {
  const token = req.body.token;

  try {
    const response = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: { 'Authorization': `Bot ${token}` }
    });
    if (response.status === 200) {
      res.json({ status: 'success', message: 'O token do bot está ativo.' });
    } else {
      res.json({ status: 'error', message: 'O token do bot não está ativo.' });
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      res.json({ status: 'error', message: 'O token do bot é inválido ou expirou.' });
    } else {
      res.json({ status: 'error', message: 'Erro ao verificar o token do bot: ' + (error.response ? error.response.data.message : error.message) });
    }
  }
});

// Endpoint para obter informações do bot
app.post('/get-bot-info', async (req, res) => {
  const token = req.body.token;

  try {
    const response = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: { 'Authorization': `Bot ${token}` }
    });
    const botInfo = response.data;
    res.json({ status: 'success', info: botInfo });
  } catch (error) {
    res.json({ status: 'error', message: 'Não foi possível obter informações do bot.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});