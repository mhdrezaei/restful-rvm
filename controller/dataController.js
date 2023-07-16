const express = require("express");
const tempString = require("../util/tempString");
const encriptFn = require("../util/encriptFn");
const createTranId = require("../util/createTranId");
const upChargeRequest = require("../request/upChargeRequest");

exports.userData = async (req, res, next) => {
  const { messageId, timestamp, userId, sign } = req.query;
  const upData = {
    hreq: {
      hi: 2406,
      htran: createTranId(),
      hkey: "af11cbf56aa712aab59951967ff11207",
      mo: userId,
      htime: (Date.now() / 1000).toFixed(),
      ao: 1000,
      walet: 5,
      caurl: "https://asanpardakht.ir",
      hop: 313,
    },
  };
  upData.hsign = encriptFn(JSON.stringify(upData.hreq).trim());
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


 //   const rawString = tempString(req.originalUrl);
  //   const extractSign = md5(rawString);
  // console.log((Date.now() / 1000).toFixed());