const express = require("express");
const md5 = require("md5");
const tempString = require("../util/tempString");
const upSignRequest = require("../request/upSignRequest");
const encriptFn = require("../util/encriptFn");
const decriptFn = require("../util/decriptFn");
const createTranId = require("../util/CreateTranId");
exports.userAuthentication = async (req, res, next) => {
  const { messageId, timestamp, userId, sign } = req.query;
  const rawString = tempString(req.originalUrl);
  const extractSign = md5(rawString);
  console.log(new Date().toString());
  const upData = {
    hreq: {
      hi: 2404,
      htran: createTranId(),
      hkey: "1e0c45e8-5a28-4e59-8011-714c182f7358",
      mo: userId,
      htime: Date.now(),
      walet: 5,
      caurl: "https://asanpardakht.ir",
      hop: 312,
    },
  };
  // const enc = encriptFn(JSON.stringify(up      Data.hreq));

  upData.hsign = encriptFn(JSON.stringify(upData.hreq));
  upData.ver = "1.0.0";
  if (sign === extractSign) {
    const upResponse = await upSignRequest(
      JSON.stringify(upData),
      upData.hreq.hi
    );
    res.status(200).json({
      success: true,
      message: "authentication successfully !",
      data: { messageId, timestamp, userId },
      sign: sign,
      upData: upResponse,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "invalid request",
    });
  }
};
