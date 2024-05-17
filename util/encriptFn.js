const crypto = require("crypto");
const fs = require("fs");

const encriptFn = (dataToEncrypt) => {
  const privateKey = Buffer.from(
    fs.readFileSync("./keys/key.private.pem", { encoding: "utf-8" })
  );
  const signature = crypto
    .sign("RSA-SHA256", dataToEncrypt, privateKey)
    .toString("base64");

  return "1#1#" + signature;
};

module.exports = encriptFn;
