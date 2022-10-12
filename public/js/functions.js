async function request(method, url, headers, data) {
  let config = {
    method: method,
    url: url,
    headers: headers,
    data: JSON.stringify(data)
  }

  return await axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('resp: \n', response)
      return error;

    });
}

function alertSuccess(text) {
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: text,
    showConfirmButton: false,
    timer: 1500
  })
}

function alertError(title, text) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    confirmButtonText: 'OK'
  })
}

