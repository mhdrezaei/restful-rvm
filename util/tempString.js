const tempString = (text) => {
  let query = text.split("?");
  let newQuery = query[1].split("&sign");

  return newQuery[0];
};

module.exports = tempString;
