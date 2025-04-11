const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.send("from route /");
});

app.get("/hello", (req, res) => {
  res.send("from route /hello");
});

app.get("/test", (req, res) => {
  res.send("from route /test");
});

app.listen(7777, () => {
    console.log("Server is listening on port 7777");
  });