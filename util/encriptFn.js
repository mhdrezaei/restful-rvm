const crypto = require("crypto");
const fs = require("fs");

const encriptFn = (dataToEncrypt) => {
  const publicKey = Buffer.from(
    fs.readFileSync("./cert/itrmsiran.tiscfz.com.pub", { encoding: "utf-8" })
  );

  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    // We convert the data string to a buffer using `Buffer.from`
    Buffer.from(dataToEncrypt)
  );

  return "1#1#" + encryptedData.toString("base64");
};

module.exports = encriptFn;
