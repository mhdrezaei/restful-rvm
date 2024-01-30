exports.statusChecker = async (req, res, next) => {
  console.log("status checked")
    res.status(200).json({
        success: true,
        message: "Service is UP"
      });
      
}