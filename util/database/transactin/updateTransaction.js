const Transaction = require("../../../models/transaction");
const updateTransaction = async (filter, update) => {
  let row = await Transaction.findOneAndUpdate(filter, update, { new: true });
  console.log(row);
};

module.exports = updateTransaction;
