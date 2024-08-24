const crypto = require("crypto")
// There are certain  core modules in node js that we make use of like https,fs,crypto
// const fs = require("node:fs")
// const https = require("node:https")
// node: need not be written as such
// It just indicates we are using a core module

console.log("Hello world")
// synchronous functions will block the main thread
// So dont use it
crypto.pbkdf2Sync("mypassword","salt",50000,50,"sha512")
console.log("First key is generated")

crypto.pbkdf2("mypassword","salt",50000,50,"sha512",()=>{
    console.log("Second key is generated")
})

const multiply = (x,y) => {
    const result = x*y
    return result
}
const ans = multiply(8,5)
console.log(ans) 