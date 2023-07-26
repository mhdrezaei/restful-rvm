const crypto = require("crypto");
const fs = require("fs");

const encriptFn = (dataToEncrypt) => {
  const privateKey = Buffer.from(
    fs.readFileSync("./keys/key.private", { encoding: "utf-8" })
  );
  const signature = crypto
    .sign("RSA-SHA256", dataToEncrypt, privateKey)
    .toString("base64");
  // console.log("Signing done", signature);

  return "1#1#" + signature;
};

module.exports = encriptFn;

// const signature = crypto
//   .createSign("RSA-SHA256")
//   .update(dataToEncrypt)
//   .sign(privateKey, "base64");

// return "1#1#" + encryptedData.toString("base64");

// const signature = crypto.sign("sha256", Buffer.from(dataToEncrypt), {
//   key: privateKey,
//   padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
// });

// console.log(signature);
// const encryptedData = crypto.privateEncrypt(
//   {
//     key: privateKey,
//     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//     oaepHash: "sha256",
//   },
//   // We convert the data string to a buffer using `Buffer.from`
//   Buffer.from(dataToEncrypt)
// );
