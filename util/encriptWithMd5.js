const crypto = require("crypto");
function encriptWithMd5(data) {
  stringSignTemp = `${data}&key=incomeTestKey`;
  const sing = crypto
    .createHash("md5")
    .update(stringSignTemp)
    .digest("hex")
    .toUpperCase();
console.log(sing)
  return sing;
}

module.exports = encriptWithMd5;
