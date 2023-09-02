const crypto = require('crypto');
function encriptWithMd5(data, key) {
  stringSignTemp = `${data}&key=${key}`;
  const sing = crypto.createHash('md5').update(stringSignTemp).digest("hex").toUpperCase();
  

  return sing;
}

module.exports = encriptWithMd5;
