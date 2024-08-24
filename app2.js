const fs = require("fs")
const https = require("https")
console.log("Hello World")
let num1 = 12
let num2 = 5

https.get("https://dummyjson.com/products/1",(response)=>{
    console.log("Fetched Data Successfully")
})

setTimeout(() => {
    console.log("setTimeout after 5 seconds")
}, 5000);

// Sync function 
// Below is a synchronous method
// So main thread will be blocked
// js engine offloads this task to libuv
fs.readFileSync("./file.txt","utf8")
console.log("This will execute only after the file is read")

// Async function 
// js engine offloads this task to libuv
fs.readFile("./file.txt","utf8",(err,data)=>{
    console.log("File Data : ",data)
})

const multiply = (x,y) => {
    const result = x*y
    return result
}
const ans = multiply(num1,num2)
console.log(ans) 