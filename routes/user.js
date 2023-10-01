const express = require("express");
const router = express.Router();
const { getMe , registerUser, loginUser } = require("../controller/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/user/new", registerUser);
router.route("/user/login").post(loginUser);
router.get("/user/me", protect, getMe);

module.exports = router;
