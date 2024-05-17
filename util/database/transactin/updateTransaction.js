const Transaction = require("../../../models/transaction");
const updateTransaction = async (filter, update) => {
  let row = await Transaction.findOneAndUpdate(filter, update, { new: true });
};

module.exports = updateTransaction;
