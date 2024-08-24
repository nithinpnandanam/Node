const fs = require("fs")
setImmediate(()=>console.log("setImmediate"))

setTimeout(() => {
    console.log("Timer Expired")
}, 0);

Promise.resolve("Promise").then((e)=>console.log(e))

fs.readFile("./file.txt","utf8",()=>{
    console.log("File Reading CB")
})

process.nextTick(()=>{
    process.nextTick(()=>console.log("inner nextTick"))
    console.log("outer nextTick")
})

console.log("Last Line is printed")

// call back queue of nextTick has more priority .
// So only when all its callback queue is complete we are moving to the next phase