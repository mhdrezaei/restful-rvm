const md5 = require("md5");
exports.userAuthentication = (req, res, next) => {
  const { messageId, timestamp, userId } = req.body;
  console.log(userId);
  const sign = md5(req.body);

  res.status(200).json({
    success: true,
    message: "user successfully created!",
    data: req.body,
    sign: sign,
  });
};
