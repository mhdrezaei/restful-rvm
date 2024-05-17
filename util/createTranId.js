function createTranId(messageID) {
  let transactionID = messageID.split("_")
  transactionID = parseInt(transactionID[1])
  return transactionID
}

module.exports = createTranId;
