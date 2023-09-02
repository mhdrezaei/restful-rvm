function lexicographicSort(obj){
    delete obj.sign
    console.log(obj)
    let sortable = [];
for (var data in obj) {
    sortable.push([data, obj[data]]);
    // console.log(data)
}
sortable.sort();
const newObj = Object.fromEntries(sortable);
const result =  Object.keys(newObj)
.map(key => {
  return `${key}=${newObj[key]}`;
})
.join('&');
return result
}

module.exports = lexicographicSort