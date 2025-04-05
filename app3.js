const crypto = require("crypto")

console.log("Hello world")
// synchronous functions will block the main thread
// So dont use it
crypto.pbkdf2Sync("mypassword","salt",5000,50,"sha512")
console.log("First key is generated")

crypto.pbkdf2("mypassword","salt",5000,50,"sha512",()=>{
    console.log("Second key is generated")
})

const multiply = (x,y) => {
    const result = x*y
    return result
}
const ans = multiply(8,5)
console.log(ans) 

// "mypassword"	: The password you want to hash.
// "salt"	    : A random string added to the password to make the hash unique and prevent rainbow table attacks.
// 50000	    : Number of iterations. More iterations = slower computation = more secure.
// 50	        : Length of the derived key (in bytes).
// "sha512"	    : The hashing algorithm to use (SHA-512 here).
// () => {}	    : Callback function that runs when the key has been generated. It receives parameters like (err, derivedKey) in real usage.
// This will generate and print a 50-byte cryptographic key derived from "mypassword".

