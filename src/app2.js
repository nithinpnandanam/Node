const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// ===================================================

// No authentication is required since we are grying to log in 
app.get("/admin/login", (req, res, next) => {
    res.send("Admin Login");
});


app.use("/admin", adminAuth);

// if we write this here authentication will be made for log in 
// order of execution 

// app.get("/admin/login", (req, res, next) => {
//     res.send("Admin Login");
// });

app.get("/admin/getAllData", (req, res, next) => {
  res.send("Obtained All Data");
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("User Deleted");
});

// ===================================================

app.get("/user/user-profile", userAuth, (req, res, next) => {
  res.send("I am a User");
});

// we dont want to use authentication when we are trying to log in
// so no middleware is used
app.get("/user/login", (req, res, next) => {
  res.send("User Login");
});
// ===================================================

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
