const { default: axios } = require("axios");

const upSignRequest = async (data) => {
  const response = await axios.post(
    `https://thirdparty.dev.tasn.ir/exts/v1/2404/1`,
    JSON.stringify(data)
  );
};

module.exports = upSignRequest;
