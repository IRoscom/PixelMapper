const { default: axios } = require("axios");

module.exports = (token, path) => {
  return axios
    .get(`https://api.telegram.org/file/bot${token}/${path}`, {
      responseType: "arraybuffer",
    })
    .then((result) => result.data);
};
