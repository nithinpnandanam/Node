const name = "Monica Geller"
let multiplyNumbers = (x,y) => {
    console.log(x*y)
}
console.log(module.exports)
module.exports = {
    name:name,
    multiplyNumbers:multiplyNumbers
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// if we want to export only a single variable or function then 
// module.exports = name
// Better syntax is module.exports = {name,multiplyNumbers}
// when we want the key value pairs to have the same value then the above syntax can be used
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// since module.exports is an {} we can also export as shown below
// module.exports.name = name
// module.exports.multiplyNumbers = multiplyNumbers
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
