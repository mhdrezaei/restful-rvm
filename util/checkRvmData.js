function checkRvmData(data) {
  const {
    messageID,
    item,
    rvmID,
    timestamp,
    totalCount,
    totalValue,
    userID,
    sign,
  } = data;
  if (
    !messageID ||
    !item ||
    !rvmID ||
    !timestamp ||
    !totalCount ||
    !totalValue ||
    !userID ||
    !sign
  ) {
    return false;
  } else {
    if (
      !messageID === "" ||
      !item === "" ||
      !rvmID === "" ||
      !timestamp === "" ||
      !totalCount === null ||
      !totalValue === null ||
      !userID === "" ||
      !sign === ""
    ) {
      return false
    }else{

        return true;
      }
  }
}

module.exports = checkRvmData;
