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
      console.log("added to DB");
      // res.status(200).json({
      //   code: 0,
      //   msg: "Success",
      // });
    } else {
      res.status(200).json({
        code: 201,
        msg: "failure",
      });
      return false;
    }
  } else {
    res.status(200).json({
      code: 202,
      msg: "failure",
    });
    return false
  }

  const upData = {
    hreq: {
      hi: process.env.HOST_ID,
      htran: createTranId(rvmData.messageID),
      hkey: process.env.HOST_API_KEY,
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
  if (rvmData.userID) {
    const upResponse = await upChargeRequest(upData, upData.hreq);
    console.log(upResponse);
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
      // console.log("upData : " + upData);
      let numberOfRepetitions = 0;
  async function resendRequest() {
    const upResponse = await upChargeRequest(upData, upData.hreq);
    if (upResponse.st === 0) {
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
      numberOfRepetitions = numberOfRepetitions + 1;
      updateTransaction(
        { transactionID: createTranId(rvmData.messageID) },
        { status: "failed" }
      );
      if (numberOfRepetitions <= 3) {
        console.log("try time : " + numberOfRepetitions);
        console.log("try time : " + process.env.RETRY_TIME);
        setTimeout(()=>{
          resendRequest()
        },process.env.RETRY_TIME);
      } else {
        console.log("the request Failed after 3 time try");
        res.status(200).json({
          success: false,
          message: "charge was failed !!",
          // upmsg: retryStatus.upResponse.stm,
          // upCode: retryStatus.upResponse.st,
          // userID: rvmData.userID,
          // upResponse : retryStatus.upResponse,
        });
      }
    }
  }
      const retryStatus = await resendRequest();
      // console.log("retry status : " + retryStatus)
      // if (!retryStatus) {
      //   res.status(200).json({
      //     success: false,
      //     message: "charge was failed !!",
      //     // upmsg: retryStatus.upResponse.stm,
      //     // upCode: retryStatus.upResponse.st,
      //     // userID: rvmData.userID,
      //     // upResponse : retryStatus.upResponse,
      //   });
      // }else{
      //   res.status(200).json({
      //     success: true,
      //     message: "charge was successfully !",
      //     upmsg: upResponse.stm,
      //   });
      // }
    }
  } else {
    res.status(200).json({
      success: false,
      message: "invalid request",
    });
  }
};
