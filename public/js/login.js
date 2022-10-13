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

async function trataResposta(resp) {
  if (resp.auth) { //se autorizado salva o token nos cookies para as demais requests    
    let decodedToken = jwt_decode(resp.token);
    Cookies.set('token', resp.token, {
      expires: 1
    });
    Cookies.set('userId', decodedToken.userId, {
      expires: 1
    });
    alertSuccess(resp.message);
    await request(
      'GET',
      'http://localhost:5000/application',
      { 'Content-Type': 'application/json' },
      {}
    ).then()
  } else {
    alertError('Falha ao efetuar o Login:', resp.message);
  }
}

