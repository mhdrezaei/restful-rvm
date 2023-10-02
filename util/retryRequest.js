const upChargeRequest = require("../request/upChargeRequest");
const createTranId = require("./createTranId");
const updateTransaction = require("./database/transactin/updateTransaction");

const retryRequest = (rvmData, upData) => {
  console.log(upData)
  let numberOfRepetitions = 0;
  async function resendRequest() {
    const upResponse = await upChargeRequest(upData, upData.hreq);
    if (upResponse === 0) {
      updateTransaction(
        { transactionID: createTranId(rvmData.messageID) },
        { status: "success" }
      );
    } else {
      numberOfRepetitions= numberOfRepetitions + 1;
      updateTransaction(
        { transactionID: createTranId(rvmData.messageID) },
        { status: "failed" }
      );
      if ((numberOfRepetitions) <= 3) {
        console.log("try time : " + numberOfRepetitions);
        resendRequest();
      } else {
        console.log("the request Failed after 3 time try");
        return;
      }
    }
  }
  resendRequest();
};

module.exports = retryRequest;
