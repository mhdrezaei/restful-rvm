const encriptWithMd5 = require("./encriptWithMd5");
function decriptWithMd5(data, rvmSign) {
 
  const encriptedData = encriptWithMd5(data);
  return rvmSign === encriptedData ? true : false;
}

module.exports = decriptWithMd5;
