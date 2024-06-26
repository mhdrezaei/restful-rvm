const Transaction = require("../../../models/transaction");
const createTranId = require("../../createTranId");
const addToDatabase = async (data) => {
  const { messageID, item, rvmID, totalCount, totalValue, userID } = data;

  // Validation
  if (!item || !rvmID || !messageID || !totalCount || !totalValue || !userID) {
    return { status: "error", message: "Please include all fields" };
  }

  // Find if user already exists
  const transactionExists = await Transaction.findOne({ messageID });

  if (transactionExists) {
    return { status: "error", message: "transaction already exists" };
  }
  
  // Create transaction
  const transaction = await Transaction.create({
    messageID,
    item,
    rvmID,
    totalCount,
    totalValue,
    userID,
    transactionID : createTranId(messageID),
    status:"unknown"
  });

  if (transaction) {
    return {
      staus: "success",
      _id: transaction._id,
      user: transaction.userID,
    };
  } else {
    return { status: "error", message: "Invalid transaction data" };
  }
};

module.exports = addToDatabase;
