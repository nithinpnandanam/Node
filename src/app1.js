const express = require("express");

const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");

app.post('/signup',async(req,res)=>{
  // creating a new instance of User model
  const user = new User({
    firstName: "Ross 2",
    lastName: "Geller",
    emailId: "ross@gmail.com",
    password: "ross@123",
    age: 30,
    gender: "Male",
  })
  try{
    await user.save()
    res.send("User Added successfully")
  }catch(err){
    console.log(err)
    res.status(400).send('Error saving the user')
  }
})
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
