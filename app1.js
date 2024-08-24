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

fs.readFile("./file.txt","utf8",(err,data)=>{
    console.log("File Data : ",data)
})
console.log("Hey You")
const multiply = (x,y) => {
    const result = x*y
    return result
}
const ans = multiply(num1,num2)
console.log(ans) 

// Reading from file.txt does not take much time
// api call takes some time
// setTimeout takes the maximum time since it is set for 5 seconds