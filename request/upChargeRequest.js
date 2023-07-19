const axios = require("axios");
const decriptFn = require("../util/decriptFn");

const upChargeRequest = async (data, hreq) => {
  const newData = {
    hreq: JSON.stringify(hreq),
    hsign: data.hsign,
    ver: data.ver,
  };
  console.log(decriptFn(JSON.stringify(hreq) ,data.hsign ))
  // console.log(newData)
  const response = await axios.post(
    `https://thirdparty.dev.tasn.ir/exts/v1/${hreq.hi}/1`,
    newData
  );
  // console.log(response)
  const responseData = response.data;
  console.log(response.data);

  return responseData;
};

module.exports = upChargeRequest;
