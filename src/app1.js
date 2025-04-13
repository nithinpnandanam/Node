const express = require("express");

const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");

app.use(express.json()) 
// if we use this middleware the json format coming from the payload will be converted into js object
// then req.body will show the payload else it will be undefined

app.post('/signup',async(req,res)=>{
  // creating a new instance of User model
  console.log(req.body)
  const user = new User(req.body)
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
