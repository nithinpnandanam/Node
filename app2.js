// Refer Image 4
const fs = require("fs")
const a = 100
setImmediate(()=>console.log("setImmediate"))
// Promise.resolve("Promise").then(()=>console.log("Promise"))
Promise.resolve("Promise").then((e)=>console.log(e))
fs.readFile("./file.txt","utf8",()=>{
    console.log("File Reading CB")
})
setTimeout(() => {
    console.log("Timer Expired")
}, 0);
process.nextTick(()=>console.log("process.nextTick"))
const printA = () => {
    console.log("a = ",a)
}
printA()
console.log("Last Line is printed")

// all the synchronous lines of code are executed bt the js engine 
// Thus "a =  100" and "Last Line is printed" appears first
// Lubuv handles all the asynchronous tasks
// They handle all the asynchronous tasks with the help of event loop and callback queues
// When the call stack is empty event loops check the callback queues 
// callback associated with procees.nextTick() is placed in a seperate callback que
// callback associated with promise is placed in a seperate callback que
// callback associated with setImmediate is placed in a seperate callback que
// callback associated with timer is placed in a seperate callback que
// callback associated with reading a file is placed in a seperate callback queue
// before timer phase D and B gets executed
// These callbacks are having more priority
// If there are several callbacks called D1,D2,D3 then these gets executed first and after that B gets executed
// when its the timer phase A gets executed
// After that procees.nextTick() and promise callbacks are checked
// since there are no such call backs present we are moving to poll phase
// callback with respect to file reading should be executed in this phase but file reading operation takes time hence does not happen now
// After that procees.nextTick() and promise callbacks are checked
// since there are no such call backs present we are moving to the check phase
// callback associated with setImmediate is executed
// After that procees.nextTick() and promise callbacks are checked
// since there are no such call backs present we are moving to the close phase
// This procees continues and again poll phase is reached thus callback with respect to file reading i sexecuted at last