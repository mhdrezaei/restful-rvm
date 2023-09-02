function checkRvmData(data){
    const {
        messageID,
        item,
        rvmID,
        timestamp,
        totalCount,
        totalValue = 1000,
        userID,
        sign,
      } = data;
      if(!messageID || !item || !rvmID || !timestamp || !totalCount || !totalValue || !userID || !sign ){
                  return false;
      }else{
        return true
      }
}

module.exports = checkRvmData