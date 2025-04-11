const express = require('express');

const app = express();

app.use("/", (req, res) => {
  res.send("from route /");
});

app.use("/hello", (req, res) => {
  res.send("from route /hello");
});

app.use("/test", (req, res) => {
  res.send("from route /test");
});



app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
