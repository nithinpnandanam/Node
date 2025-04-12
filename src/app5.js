const express = require("express");

const app = express();

// ===================================================

// Route Parameters (Path Params)

// app.get("/user/:userId", (req, res) => {
//   console.log(req.params) // { userId: ':12' }
//   res.send({
//     firstName: "Chandler",
//     secondName: "Bing",
//   });
// });

// http://localhost:7777/user/:12
// ===================================================
// app.get("/user/:userId/:userName/:password", (req, res) => {
//   console.log(req.params); 
//   res.send({
//     firstName: "Chandler",
//     secondName: "Bing",
//   });
// });
// http://localhost:7777/user/:12/:user-1/:pass123
// { userId: ':12', userName: ':user-1', password: ':pass123' }
// ===================================================

// Query Parameters

app.get("/user", (req, res) => {
    console.log(req.query); 
    res.send({
      firstName: "Chandler",
      secondName: "Bing",
    });
  });

// http://localhost:7777/user?userId=''123'&password='pass123'
// { userId: "''123'", password: "'pass123'" }
// ===================================================



app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
