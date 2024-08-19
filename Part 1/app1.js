require("./app2.js")
// require("./app2") also correct
// This is how we import a module 
// all code within app2.js is executed
// While importing we cannot access all the variables and functions within app2.js
// If we want to acces the variables and functions from another module we need to export that implicitly 
// check app3.js
let a = 1
let b = 2
console.log(a+b)
const demoObj = require("./app3.js")
console.log(demoObj.name)
demoObj.multiplyNumbers(4,4)
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// We can also destructuring right in the beginning
// const {name,multiplyNumbers} = require("./app3.js")
// cosole.log(name)
// console.log(multiplyNumbers(4,4))
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
planet = "Mars" 
console.log(planet)
// No error is shown since planet common js modules does not follow strict mode
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
