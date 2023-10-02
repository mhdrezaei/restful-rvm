function createTranId(messageID) {
  // let now = new Date();

  // timestamp = now.getFullYear().toString(); // 2011
  // timestamp += (now.getMonth < 9 ? "0" : "") + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
  // timestamp += (now.getDate < 10 ? "0" : "") + now.getDate().toString(); // pad with a 0
  // timestamp +=
  //   now.getHours().toString() +
  //   now.getMinutes().toString() +
  //   now.getSeconds().toString() +
  //   now.getMilliseconds().toString();
  // return parseInt(timestamp);
  let transactionID = messageID.split("_")
  transactionID = transactionID[1]
  console.log(typeof(transactionID))
  // console.log(transactionID)
  return transactionID
}

module.exports = createTranId;
