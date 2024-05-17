exports.statusChecker = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Service is UP"
      });
      
}