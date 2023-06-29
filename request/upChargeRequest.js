const axios = require("axios");

const upChargeRequest = async (data, hreq) => {
  console.log(data)
  const response = await axios.post(
    `https://thirdparty.dev.tasn.ir/exts/v1/${hreq.hi}/1`,
    JSON.stringify(data)
  );
  const responseData = JSON.parse(response.data.hresp);
  console.log(responseData);

  return responseData;
};

module.exports = upChargeRequest;
