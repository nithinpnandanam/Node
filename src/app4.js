const express = require('express');

const app = express();
// ===================================================
// app.get("/a(b)?c", (req, res) => {
//     res.send({
//       "firstName": "Chandler",
//       "secondName": "Bing"
//     });
//   });
// b is optional
// http://localhost:7777/ac
// http://localhost:7777/abc
// both will work
// ===================================================
// app.get("/a(bc)?d", (req, res) => {
//     res.send({
//       "firstName": "Chandler",
//       "secondName": "Bing"
//     });
//   });

// http://localhost:7777/ad
// http://localhost:7777/abcd
// ===================================================
// app.get("/abc+d", (req, res) => {
//     res.send({
//       "firstName": "Chandler",
//       "secondName": "Bing"
//     });
//   });
// there can be many c between ab and d
// http://localhost:7777/abcccccd this will work
// http://localhost:7777/acbcccccd this will not work
// ===================================================
// app.get("/ab*c", (req, res) => {
//     res.send({
//       "firstName": "Chandler",
//       "secondName": "Bing"
//     });
//   });

// http://localhost:7777/abHellod
// Anything can be written between ab and c
// ===================================================
// Regex Usage
// app.get(/a/, (req, res) => {
//     res.send({
//       "firstName": "Chandler",
//       "secondName": "Bing"
//     });
// });
// http://localhost:7777/rr wil not work
// if a is there it will work
// http://localhost:7777/cab wil work

// ===================================================
app.get(/.*fly$/,(req, res) => {
    res.send({
      "firstName": "Chandler",
      "secondName": "Bing"
    });
});
// http://localhost:7777/butterfly2 will not work
// http://localhost:7777/butterfly will work
// .* = "zero or more of any character"
// fly - the word
// $ the end 
// fly must come at the end
// ===================================================

app.listen(7777, () => {
    console.log("Server is listening on port 7777");
});