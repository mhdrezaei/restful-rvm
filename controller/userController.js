const express = require("express");
const md5 = require("md5");
const tempString = require("../util/tempString");
const upSignRequest = require("../request/upSignRequest");
const encriptFn = require("../util/encriptFn");
const decriptFn = require("../util/decriptFn");
exports.userAuthentication = (req, res, next) => {
  const { messageId, timestamp, userId, sign } = req.query;
  const rawString = tempString(req.originalUrl);
  const extractSign = md5(rawString);
  const upData = {
    hi: 2404,
    htran: messageId,
    hkey: "1e0c45e8-5a28-4e59-8011-714c182f7358",
    mo: userId,
    htime: Date.now(),
    walet: 5,
    caurl: "https://asanpardakht.ir",
    hop: 312,
  };

  const enc = encriptFn(JSON.stringify(upData));
  const dec = decriptFn(enc);
  console.log(dec);

  upData.hsign = encriptFn(JSON.stringify(upData));
  // console.log(upData);
  if (sign === extractSign) {
    upSignRequest(upData);
    res.status(200).json({
      success: true,
      message: "authentication successfully !",
      data: { messageId, timestamp, userId },
      sign: sign,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "invalid request",
    });
  }
};
