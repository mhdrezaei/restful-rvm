const axios = require("axios");
const upChargeRequest = async (data, hreq) => {
  const newData = {
    hreq: JSON.stringify(hreq),
    hsign: data.hsign,
    ver: data.ver,
  };
  console.log(newData);
  const response = await axios.post(
    `https://thirdparty.dev.tasn.ir/exts/v1/${hreq.hi}/1`,
    null,
    { newData }
  );
  const responseData = JSON.parse(response.data.hresp);
  return responseData;
};

module.exports = upChargeRequest;
