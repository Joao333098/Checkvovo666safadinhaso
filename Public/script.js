document.getElementById('tokenForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const token = document.getElementById('token').value;
  const tokenType = document.getElementById('tokenType').value;
  const resultDiv = document.getElementById('result');
  const infoDiv = document.getElementById('info');

  try {
    const response = await fetch('/check-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, tokenType })
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

document.getElementById('infoButton').addEventListener('click', () => {
  const infoDiv = document.getElementById('info');
  infoDiv.innerHTML = `
    <p>Criador: vovo666</p>
    <p>Servidor: <a href="https://discord.gg/RKRM6gXSVf" target="_blank">https://discord.gg/RKRM6gXSVf</a></p>
    <p>Ajude ele a crescer!</p>
  `;
});
