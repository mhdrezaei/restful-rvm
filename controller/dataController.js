const express = require("express");
const md5 = require("md5");
const tempString = require("../util/tempString");
const encriptFn = require("../util/encriptFn");
const createTranId = require("../util/createTranId");
const upChargeRequest = require("../request/upChargeRequest");
const decriptFn = require("../util/decriptFn");
const { json } = require("body-parser");
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

  console.log(JSON.stringify(JSON.stringify(upData.hreq)));

  const hres =
    '{"hi":2404,"hop":313,"htime":1688048598,"htran":2023529175317865,"st":1100,"stm":"کلید نامعتبر برای این پذیرنده"}';
  const resSing =
    "1#1#JvvEPoSAiZY0AbtjRgT7Z1jvJE4s5T4i45Y54wLwtk8u1IbMZvF5ZBcqcuKwKlJAxnp00u8aSAygn1pNlY4O1bStunWEDCXxPTG2yc9BpggSd2EWO1DHMWwu3lNoawxXrGu2KxHLQGgW8uTgNW7GWLMLZhUWbMZKQmFbEO9liaaRLbh3QRqunWjiz/kbkp9ZK+/g1JPEUWbGe8yZAwUkBW79HyKqAAb6/AAiNO1UvPYnGPvor8w+rTpITUV9thXcohnpyBcHfO9+zYYNKRRUhk5zWoPdB6G602B+aUZ+uOGS522RplR5O0cBRifBplCqV3MmoAwnU0TtOetFgVvnAg==";
  const enc1 = encriptFn(JSON.stringify(JSON.stringify(hres)).trim());
  const dec1 = decriptFn(JSON.stringify(JSON.stringify(hres)), resSing);
  console.log("test : " + dec1);

  const enc = encriptFn(JSON.stringify(JSON.stringify(upData.hreq)).trim());
  console.log("encription : " + enc);
  const dec = decriptFn(JSON.stringify(JSON.stringify(upData.hreq)), enc);
  console.log(dec);

  upData.hsign = encriptFn(JSON.stringify(JSON.stringify(upData.hreq)).trim());
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
