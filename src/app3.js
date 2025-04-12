const express = require('express');

const app = express();

// order of execution is important
// app.use("/user", (req, res) => {
//     res.send("from app.use");
// });

app.get("/user", (req, res) => {
  res.send({
    "firstName":"Chandler",
    "secondName":"Bing"
  });
});

app.post("/user", (req, res) => {
  res.send("Posted data in database");
});

app.get("/test", (req, res) => {
  res.send("from route /test");
});

app.use("/user", (req, res) => {
    res.send("from app.use");
});

app.listen(7777, () => {
    console.log("Server is listening on port 7777");
});