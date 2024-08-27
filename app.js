const crypto = require("crypto")

// process.env.UV_THREADPOOL_SIZE = 5;
crypto.pbkdf2("password","salt",800000,50,"sha512",()=>{
    console.log("1-crypto PBKDF2 done")
})
crypto.pbkdf2("password","salt",800000,50,"sha512",()=>{
    console.log("2-crypto PBKDF2 done")
})
crypto.pbkdf2("password","salt",800000,50,"sha512",()=>{
    console.log("3-crypto PBKDF2 done")
})
crypto.pbkdf2("password","salt",800000,50,"sha512",()=>{
    console.log("4-crypto PBKDF2 done")
})
crypto.pbkdf2("password","salt",800000,50,"sha512",()=>{
    console.log("5-crypto PBKDF2 done")
})

// when the code was run 4 threads were used 
// so "5-crypto PBKDF2 done" took some time to complete
// it was waiting for any one of the 4 threads to be free
// but we can alter the number of thread pool used
// if its made 2 then,two results are shown first,then the other two and finnaly the last one will be printed
