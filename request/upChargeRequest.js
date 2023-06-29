const axios = require("axios");

const upChargeRequest = async (data, hreq) => {
  //console.log(JSON.stringify(hreq));
  //console.log(data);
  const newData = {
    hreq: JSON.stringify(hreq),
    hsign: data.hsign,
    ver: data.ver,
  };
  console.log(JSON.stringify(newData));
  const response = await axios.post(
    `https://thirdparty.dev.tasn.ir/exts/v1/${hreq.hi}/1`,
    JSON.stringify(newData)
  );
  const responseData = JSON.parse(response.data.hresp);
  console.log(response.data);

  return responseData;
};

module.exports = upChargeRequest;
