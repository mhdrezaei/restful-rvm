const express = require("express");
const router = express.Router();
const { allTransactions , successTransactions , failedTransactions , unknownTransactions } = require("../controller/sunmmaryController");

router.route("/summary/all").get(allTransactions);
router.route("/summary/success").get(successTransactions);
router.route("/summary/failed").get(failedTransactions);
router.route("/summary/unknown").get(unknownTransactions);

module.exports = router;