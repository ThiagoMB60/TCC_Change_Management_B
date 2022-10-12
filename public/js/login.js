
async function tryLogin() {
  await request(
    'POST',
    'http://localhost:5000/user/login',
    { 'Content-Type': 'application/json' },
    {
      user: document.getElementById('iptUser').value,
      pass: document.getElementById('iptPass').value
    }
  ).then(response => {
    trataResposta(response);
  }).catch(error => {
    alert('Usuário e/ou Senha inválidos.');
  })
}

function trataResposta(resp) {
  if (!resp.auth) {
    alertError('Falha ao efetuar login:', resp.message);
  }


}