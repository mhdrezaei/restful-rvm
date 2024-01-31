const axios = require("axios");

const upSignRequest = async (data, hi) => {
  const response = await axios.post(
    `https://thirdparty.dev.tasn.ir/exts/v1/${hi}/1`,
    JSON.stringify(data)
  );
  const responseData = JSON.parse(response.data.hresp);
  // console.log(responseData);
  return responseData.stm;
};

module.exports = upSignRequest;
