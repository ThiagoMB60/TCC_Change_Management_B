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

