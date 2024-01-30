const md5 = require("md5");
function encriptWithMd5(data) {
  
 const stringSignTemp = `${data}&key=incomTestKey`;
  const sign = md5(stringSignTemp).toUpperCase()
  console.log(sign)
  return sign;
}

module.exports = encriptWithMd5;
