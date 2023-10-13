const Transaction = require("../models/transaction")

exports.allTransactions = async (req, res, next) => {
    await Transaction.count({},function( err, count){
        console.log( "Number of transactions:", count );
        res.status(200).json({
            success: true,
            count: count
          });
    })
}
exports.successTransactions = async (req, res, next) => {
    await Transaction.count({status : "success"},function( err, count){
        console.log( "Number of success transactions:", count );
        res.status(200).json({
            success: true,
            count: count
          });
    })
}
exports.failedTransactions = async (req, res, next) => {
    await Transaction.count({status : "failed"},function( err, count){
        console.log( "Number of failed transactions:", count );
        res.status(200).json({
            success: true,
            count: count
          });
    })
}
exports.unknownTransactions = async (req, res, next) => {
    await Transaction.count({status : "unknown"},function( err, count){
        console.log( "Number of unknown transactions:", count );
        res.status(200).json({
            success: true,
            count: count
          });
    })
}