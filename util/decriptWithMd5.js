const encriptWithMd5 = require("./encriptWithMd5");
function decriptWithMd5(data, rvmSign) {
  const sing = rvmSign;
  const encriptedData = encriptWithMd5(data);
  return sing === encriptedData ? true : false;
}

module.exports = decriptWithMd5;
