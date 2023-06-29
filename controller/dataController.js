const express = require("express");
const md5 = require("md5");
const tempString = require("../util/tempString");
const encriptFn = require("../util/encriptFn");
const createTranId = require("../util/createTranId");
const upChargeRequest = require("../request/upChargeRequest");
const decriptFn = require("../util/decriptFn");
exports.userData = async (req, res, next) => {
  const { messageId, timestamp, userId, sign } = req.query;
  //   const rawString = tempString(req.originalUrl);
  //   const extractSign = md5(rawString);
  // console.log((Date.now() / 1000).toFixed());
  const upData = {
    hreq: {
      hi: 2404,
      htran: createTranId(),
      hkey: "1e0c45e8-5a28-4e59-8011-714c182f7358",
      mo: userId,
      htime: (Date.now() / 1000).toFixed(),
      ao: 1000,
      walet: 5,
      caurl: "https://asanpardakht.ir",
      hop: 313,
    },
  };
  const enc = encriptFn(JSON.stringify(upData.hreq));
  console.log("encription : " + enc);
  const dec = decriptFn(JSON.stringify(upData.hreq), enc);
  console.log(dec);

  upData.hsign = encriptFn(JSON.stringify(upData.hreq));
  upData.ver = "1.0.0";
  if (userId) {
    const upResponse = await upChargeRequest(upData, upData.hreq);
    console.log(upResponse);
    if (upResponse.st === 0) {
      console.log("success");
      res.status(200).json({
        success: true,
        message: "charge was successfully !",
        upmsg: upResponse.stm,
      });
    } else {
      console.log("failed");
      res.status(200).json({
        success: false,
        message: "charge was failed !",
        upmsg: upResponse.stm,
        upCode: upResponse.st,
        userId,
      });
    }
  } else {
    res.status(200).json({
      success: false,
      message: "invalid request",
    });
  }
};
