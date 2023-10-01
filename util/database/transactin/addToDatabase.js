const Transaction = require("../../../models/transaction");
const addToDatabase = async (data) => {
  const { messageID, item, rvmID, totalCount, totalValue, userID } = data;

  // Validation
  if (!item || !rvmID || !messageID || !totalCount || !totalValue || !userID) {
    throw new Error("Please include all fields");
  }

  // Find if user already exists
  const transactionExists = await Transaction.findOne({ messageID });

  if (transactionExists) {
    throw new Error("transaction already exists");
  }

  // Create transaction
  const transaction = await Transaction.create({
    messageID,
    item,
    rvmID,
    totalCount,
    totalValue,
    userID,
  });

  if (transaction) {
    return {
      staus: "success",
      _id: user._id,
      user: user.userID,
    };
  } else {
    throw new error("Invalid transaction data");
  }
};

module.exports = addToDatabase;
