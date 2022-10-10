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
    execFunc(response);
  }).catch(error => {
    console.error(error);
  })
}

function execFunc(response) {
  console.log(response.token);
}