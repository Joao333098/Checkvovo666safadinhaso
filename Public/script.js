document.getElementById('tokenForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const token = document.getElementById('token').value;
  const tokenType = document.getElementById('tokenType').value;
  const resultDiv = document.getElementById('result');
  const infoDiv = document.getElementById('info');

  // Limpar informações anteriores
  resultDiv.innerHTML = '';
  infoDiv.innerHTML = '';

  try {
    const endpoint = tokenType === 'user' ? '/check-user-token' : '/check-bot-token';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    const data = await response.json();
    if (data.status === 'success') {
      resultDiv.innerHTML = `<p style="color: green;">${data.message}</p>`;
    } else {
      resultDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">Erro ao verificar o token: ${error.message}</p>`;
  }
});

// Obter informações do token
document.getElementById('infoButton').addEventListener('click', async () => {
  const token = document.getElementById('token').value;
  const tokenType = document.getElementById('tokenType').value;
  const infoDiv = document.getElementById('info');

  try {
    const endpoint = tokenType === 'user' ? '/get-user-info' : '/get-bot-info';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    const data = await response.json();
    if (data.status === 'success') {
      infoDiv.innerHTML = `<p><strong>Informações:</strong></p><pre>${JSON.stringify(data.info, null, 2)}</pre>`;
    } else {
      infoDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
    }
  } catch (error) {
    infoDiv.innerHTML = `<p style="color: red;">Erro ao obter informações: ${error.message}</p>`;
  }
});