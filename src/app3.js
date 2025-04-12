const express = require("express");

const app = express();

// ===================================================



app.get("/admin/getAllData", (req, res, next) => {
  try {
    throw new Error("kjbsjk");
    res.send("Obtained All Data");
  } catch (err) {
    res.status(500).send("Unable to obtain data");
  }
});

// if try catch is not there belo code with handle the error
app.use("/", (err, req, res, next) => {
  if (err) {
    console.log("Error", err);
    res.status(500).send("Something went wrong");
  }
});

// ===================================================

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
