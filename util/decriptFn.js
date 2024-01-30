const crypto = require("crypto");
const fs = require("fs");

const decriptFn = (dataToDecript, signature) => {
  const splitData = signature.split("#");

  const publicKey = fs.readFileSync("./asan-keys/asan.pubkey.pem", {
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

// console.log("split" + splitData[2]);
// console.log("verfy done", verifyData);
// const isVerified = crypto.verify(
//   "sha256",
//   Buffer.from(dataToDecript),
//   {
//     key: publicKey,
//     padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
//   },
//   Buffer.from(splitData[2])
// );
// console.log(isVerified);
// const verifier = crypto.createVerify("rsa-sha256");

// verifier.update(dataToDecript);

// const isVerified = verifier.verify(publicKey, signature, "hex");

// console.log(isVerified);

// const verifyData = crypto
//   .createVerify("RSA-SHA256")
//   .update(dataToDecript)
//   .verify(publicKey, splitData[2], "base64");

// console.log(verifyData);

// const decryptedData = crypto.publicDecrypt(
//   {
//     key: publicKey,
//     // In order to decrypt the data, we need to specify the
//     // same hashing function and padding scheme that we used to
//     // encrypt the data in the previous step
//     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//     oaepHash: "sha256",
//   },
//   Buffer.from(splitData[2], "base64")
// );

// return decryptedData.toString("utf-8");
