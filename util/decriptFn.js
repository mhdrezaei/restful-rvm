const crypto = require("crypto");
const fs = require("fs");

const decriptFn = (dataToDecript) => {
  const splitData = dataToDecript.split("#");

  const privateKey = fs.readFileSync("./rsa/private.pem", {
    encoding: "utf-8",
  });

  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(splitData[2], "base64")
  );

  return decryptedData.toString("utf-8");
};

module.exports = decriptFn;
