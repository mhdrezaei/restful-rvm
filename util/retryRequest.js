const upChargeRequest = require("../request/upChargeRequest");
const createTranId = require("./createTranId");
const updateTransaction = require("./database/transactin/updateTransaction");

const retryRequest = async (rvmData, upData , res) => {
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
        resendRequest();
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
  resendRequest();
  
};

module.exports = retryRequest;


