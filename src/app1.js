const express = require("express");

const app = express();
// ===================================================
// app.use("/", (req, res) => {
//   res.send("from route /");
// });

// app.use("/hello", (req, res) => {
//   res.send("from route /hello");
// });

// app.use("/test", (req, res) => {
//   res.send("from route /test");
// });

// if we search for http://localhost:7777/ or anything it will always provide the same result
// ===================================================

// app.use("/hello", (req, res) => {
//   res.send("from route /hello");
// });

// app.use("/test", (req, res) => {
//   res.send("from route /test");
// });

// if we  search for http://localhost:7777/hello we will get from route /hello
// if we  search for http://localhost:7777/hello/test we will get from route /hello
// if we  search for http://localhost:7777/hello-world then its different and will not give a result

// ===================================================

// app.use("/hello", (req, res) => {
//   res.send("from route /hello");
// });

// app.use("/test", (req, res) => {
//   res.send("from route /test");
// });

// app.use("/", (req, res) => {
//   res.send("from route /");
// });

// order of execution is considered
// ===================================================


app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});

// All routes will give "from route /"
// Request handlers is the arrow function

// ===================================================

