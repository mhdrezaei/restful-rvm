const Transaction = require("../../../models/transaction");
const addToDatabase = async (data) => {
  const { messageID, item, rvmID, totalCount, totalValue, userID } = data;

  // Validation
  if (!item || !rvmID || !messageID || !totalCount || !totalValue || !userID) {
    console.log("Please include all fields")
    return { status: "error", message: "Please include all fields" };
  }

  // Find if user already exists
  const transactionExists = await Transaction.findOne({ messageID });

  if (transactionExists) {
    console.log("transaction already exists")
    return { status: "error", message: "transaction already exists" };
  }
  let transactionID = data.messageID.split("_")
  transactionID = transactionID[1]
  console.log(transactionID)
  // Create transaction
  const transaction = await Transaction.create({
    messageID,
    item,
    rvmID,
    totalCount,
    totalValue,
    userID,
    transactionID,
    status:"unknown"
  });

  if (transaction) {
    console.log("success")
    return {
      staus: "success",
      _id: transaction._id,
      user: transaction.userID,
    };
  } else {
    console.log("invalid")
    return { status: "error", message: "Invalid transaction data" };
  }
};

module.exports = addToDatabase;
