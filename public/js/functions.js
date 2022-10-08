async function request(method, url, headers, data) {
  let config = {
    method: method,
    url: url,
    headers: headers,
    data: JSON.stringify(data)
  }

  let resp = await axios(config)
    .then((response) => {
      // console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      return error;
    });

  return resp;
}