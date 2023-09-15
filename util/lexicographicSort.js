function lexicographicSort(obj) {
  delete obj.sign;
  let sortable = [];
  for (var data in obj) {
    sortable.push([data, obj[data]]);
  }
  sortable.sort();
  const sorted = Object.fromEntries(sortable);
  const result = Object.keys(sorted)
    .map((key) => {
      return `${key}=${sorted[key]}`;
    })
    .join("&");
    console.log(result)
  return result;
}

module.exports = lexicographicSort;
