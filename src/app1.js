const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const cookieParser = require('cookie-parser')


const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')
const userRouter = require('./routes/user')

app.use(express.json());
app.use(cookieParser()) 

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter)

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
