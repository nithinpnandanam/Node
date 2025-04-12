const express = require("express");

const app = express();

// ===================================================
// app.get("/user",
//   (req, res,next) => {
//     console.log("Response handler 1")
//   }
// );
// since we are not sending any response the there will be no out put
// it will be in a loading state and after a timeout it will get cancelled

// ===================================================
// app.get("/user",
//   (req, res,next) => {
//     console.log("Response handler 1")
//     res.send('From Response handler 1')
//     next()
//   },
//   (req, res,next)=>{
//     console.log("Response handler 2")
//   }
// );
// next() calls the next repsonse handler
// ===================================================
// app.get("/user",
//   (req, res,next) => {
//     console.log("Response handler 1")
//     res.send('From Response handler 1')
//     next()
//   },
//   (req, res,next)=>{
//     console.log("Response handler 2")
//     res.send('From Response handler 1')

//   }
// );
// This will throw an error since we cannot send two responses to an incoming api request
// ===================================================
// app.get("/user",
//   (req, res,next) => {
//     console.log("Response handler 1")
//     next()
//   },
//   (req, res,next)=>{
//     res.send('From Response handler 2')
//     console.log("Response handler 2")

//   }
// );
// ===================================================

// app.get("/user",
//   (req, res,next) => {
//     console.log("Response handler 1")
//     next()
//   },
//   (req, res,next)=>{
//     console.log("Response handler 2")
//     next()

//   }
// );
// Now we get an error
// Cannot GET /user
// for http://localhost:7777/user we are expecting a response handler
// but even though next() is present corresponding resposne handler is not present
//
// ===================================================
// app.get("/user",
//   (req, res,next) => {
//     console.log("Response handler 1")
//     next()
//   },
//   (req, res,next)=>{
//     console.log("Response handler 2")
//   }
// );
// if we are not givng next() in the second event handler then the request will be hang
// ===================================================
// Different syntax for route handlers

// here we have an array of all the route handler
// app.get("/user",[
//   (req, res,next) => {
//   console.log("Response handler 1")
//   next()
// },
// (req, res,next)=>{
//   console.log("Response handler 2")
// } ]
// );

// here the first route handler is outside the array
// the second and third route handler is in an array

// app.get("/user",
//   (req, res,next) => {
//   console.log("Response handler 1")
//   next()
// },
// [
// (req, res,next)=>{
//   console.log("Response handler 2")
//   next()
// },
// (req, res,next)=>{
//   console.log("Response handler 3")
// }
// ]
// );

// ===================================================

// this is also a syntax that we follow

app.get("/user", (req, res, next) => {
  console.log("Response handler 1");
  next()
});

app.get("/user", (req, res, next) => {
  console.log("Response handler 2");
  res.send("Data")
});

// ===================================================

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
