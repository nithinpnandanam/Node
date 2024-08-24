const fs = require("fs")
setImmediate(()=>console.log("setImmediate"))

setTimeout(() => {
    console.log("Timer Expired")
}, 0);

Promise.resolve("Promise").then((e)=>console.log(e))

fs.readFile("./file.txt","utf8",()=>{
    setTimeout(() => {
        console.log("2nd timer")
    }, 0);
    process.nextTick(()=>console.log("2nd nextTick"))
    setImmediate(()=>console.log("2nd setImmediate"))
    console.log("File Reading CB")
})

process.nextTick(()=>console.log("process.nextTick"))

console.log("Last Line is printed")

// Everything happens as usual
// there is a concept where event loop waits at the poll phase
// this happens when the callback queues is empty and the call stack is empty 
// while the file is being read event loop waits at the poll phase and when the file is fully read the callback is executed
// Refer Image 6
// "File Reading CB" is printed now 
// all the callbacks related to the asynchronous tasks are moved to the callback queue accordingly
// before moving to check phase procees.nextTick() and promise callbacks are checked
// then G is executed
// then H is executed
// then F is ixecuted