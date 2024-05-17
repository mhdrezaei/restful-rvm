const crypto = require("crypto");
const fs = require("fs");

const decriptFn = (dataToDecript, signature) => {
  const splitData = signature.split("#");

  const publicKey = fs.readFileSync("./keys/key.public.pem", {
    encoding: "utf-8",
  });
  const verifyData = crypto.verify(
    "RSA-SHA256",
    dataToDecript,
    publicKey,
    Buffer.from(splitData[2], "base64")
  );

  return verifyData;
};

module.exports = decriptFn;

