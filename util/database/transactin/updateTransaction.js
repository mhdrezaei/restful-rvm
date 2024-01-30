const Transaction = require("../../../models/transaction");
const updateTransaction = async (filter, update) => {
  let row = await Transaction.findOneAndUpdate(filter, update, { new: true });
  console.log("updated");
};

module.exports = updateTransaction;
