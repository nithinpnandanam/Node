
console.log("Hello World")
let num1 = 12
let num2 = 5

setTimeout(() => {
    console.log("setTimeout after 3 seconds")
}, 3000);

setTimeout(() => {
    console.log("setTimeout after 0 seconds")
}, 0);

console.log("Hey You")
const multiply = (x,y) => {
    const result = x*y
    return result
}
const ans = multiply(num1,num2)
console.log(ans) 
// setTimeout will run after 3sec means that it will take 3 seconds after the call stack is empty to run
// trust issues with setTimeout
 
