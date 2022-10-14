//IMPORTS ↓↓
const crypto = require('crypto-js');
const axios = require('axios').default;
require("dotenv").config();

//IMPORTS ↑↑


module.exports = {
  msgColor(type) {
    switch (type) {
      case 'yellow':
        return '\x1b[43m%s\x1b[0m';
      case 'red':
        return '\x1b[41m%s\x1b[0m';
      case 'green':
        return '\x1b[42m%s\x1b[0m';
      case 'blue':
        return '\x1b[44m%s\x1b[0m';
      case 'white':
        return '\x1b[47m%s\x1b[0m';
    }
  },
  msgSuccess(msg) {
    console.log('\x1b[42m%s\x1b[0m', msg);
  },
  msgWarning(msg) {
    console.log('\x1b[43m%s\x1b[0m', msg);
  },
  msgError(msg) {
    console.log('\x1b[41m%s\x1b[0m', msg);
  },
  crypt(message, key) {
    return crypto.AES.encrypt(message, key).toString();
  },
  decrypt(cryptedMessage, key) {
    let bytes = crypto.AES.decrypt(cryptedMessage, key)
    return bytes.toString(crypto.enc.Utf8);
  },
  async axiosRequest(method, url, headers, data) {
    let result;
    console.log(method, url, headers, data)
    await axios.post({
      url: url,
      headers: headers,
      data: JSON.stringify(data)
    }).then((response) => {
      console.log(response);
      result = response.data;
    }).catch((error) => {
      console.log("erro no utils")
      //return error;
    })
    return result;
    console.log(result)
  }
}