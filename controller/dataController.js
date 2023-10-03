const encriptFn = require("../util/encriptFn");
const createTranId = require("../util/createTranId");
const upChargeRequest = require("../request/upChargeRequest");
const lexicographicSort = require("../util/lexicographicSort");
const decriptWithMd5 = require("../util/decriptWithMd5");
const checkRvmData = require("../util/checkRvmData");
const addToDatabase = require("../util/database/transactin/addToDatabase");
const retryRequest = require("../util/retryRequest");
const updateTransaction = require("../util/database/transactin/updateTransaction");
exports.userData = async (req, res, next) => {
  const rvmData = req.body;
  const rvmSign = rvmData.sign;

  if (checkRvmData(rvmData)) {
    const sortedData = lexicographicSort(rvmData);
    if (decriptWithMd5(sortedData, rvmSign)) {
      addToDatabase(rvmData);
      res.status(200).json({
        code: 0,
        msg: "Success",
      });
    } else {
      res.status(200).json({
        code: 201,
        msg: "failure",
      });
    }
  } else {
    res.status(200).json({
      code: 202,
      msg: "failure",
    });
  }

  const upData = {
    hreq: {
      hi: 2406,
      htran: createTranId(rvmData.messageID),
      hkey: "af11cbf56aa712aab59951967ff11207",
      mo: rvmData.userID,
      htime: (Date.now() / 1000).toFixed(),
      ao: rvmData.totalValue,
      walet: 5,
      caurl: "https://asanpardakht.ir",
      hop: 313,
    },
  };

  upData.hsign = encriptFn(JSON.stringify(upData.hreq));
  upData.ver = "1.0.0";
  if (userID) {
    const upResponse = await upChargeRequest(upData, upData.hreq);
    // console.log(upResponse);
    if (upResponse.st === 0) {
      // console.log("success");
      updateTransaction(
        { transactionID: createTranId(rvmData.messageID) },
        { status: "success" }
      );
      res.status(200).json({
        success: true,
        message: "charge was successfully !",
        upmsg: upResponse.stm,
      });
    } else {
      console.log("failed");
      console.log("upData : " + upData);
      retryRequest(rvmData, upData);

      // res.status(200).json({
      //   success: false,
      //   message: "charge was failed !",
      //   upmsg: upResponse.stm,
      //   upCode: upResponse.st,
      //   userID,
      //   upResponse,
      // });
    }
  } else {
    res.status(200).json({
      success: false,
      message: "invalid request",
    });
  }
};
