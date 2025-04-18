const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");
const {validateSignUpData,validateEditProfileData} = require('./utils/validations')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth')

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')

app.use(express.json());
app.use(cookieParser()) 

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)

// When a user gives an api call to '/profile/edit' >> at first all the apis in authRouter is checked then profileRouter is checked then requestRouter is checked

connectDB()
  .then(() => {
    console.log("Connected to Database");
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  })
  .catch(() => {
    console.error("Database not connected");
  });
