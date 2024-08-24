// js engine asks libuc to carry out setImmediate since its an asynchronous operation
// similarly for readFile and setTimeout
// when the call stack is empty the event loop checks for any callback functions in the callback queue
// here we need to consider only 3 callback queue
// callback queue for setImmediate,setTimeout and readFile
// These callback queue contains calback functions once the asynchronous operations are completed.
// Lets say reading the file is taking a much larger time because of the contents in the file
// after "a = 100" and "Last Line is printed" call stack will be empty
// in timer phase we can see there is a callback associated called A 
// A will be present in the callback queue of setTimer 
// Event loop puts A in the call stack for execution and once the callback function is executed its pushed out of the call stack
// "Timer Expired" will be printed
// Now coming to the poll phase
// lets assume the file reading proceess is not complete now
// we will be moving to check phase
// in check phase we can see there is a callback associated called B
// B will be present in the callback queue of setImmediate
// Event loop puts B in the call stack for execution and once the callback function is executed its pushed out of the call stack
// "setImmediate" will be printed
// Now moving to the close phase
// since its happeining in a loop we again come to the timer phase
// then reaches the poll phase
// when poll phase is reached the file is read and callback C will be there in the callback que of readFile
// event loop executes C by putting it in the call stack and later popping it out once complete
const fs = require("fs")
const a = 100
setImmediate(()=>console.log("setImmediate"))
fs.readFile("./file.txt","utf8",()=>{
    console.log("File Reading CB")
})
setTimeout(() => {
    console.log("Timer Expired")
}, 0);

const printA = () => {
    console.log("a = ",a)
}
printA()
console.log("Last Line is printed")