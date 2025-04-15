const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");
const {validateSignUpData,validateEditProfileData} = require('./utils/validations')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth')


app.use(express.json());
app.use(cookieParser()) // This middleware is needed to read the cookie
// if we use this middleware the json format coming from the payload will be converted into js object
// then req.body will show the payload else it will be undefined
// =================================================================
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req)
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypting the password
    const passwordHash = await bcrypt.hash(password,10) // second param is saltRounds
    console.log("passwordHash",passwordHash)

    // creating a new instance of new User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash

    });
    await user.save(); // This is how we save to a databse
    res.send("User Added successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error saving the user");
  }
});
// =================================================================
// User Login
app.post('/login',async (req,res)=>{
  try{
    const {emailId,password} = req.body
    const user = await User.findOne({emailId:emailId})
    console.log("user",user)
    // findOne will return null if there is no match
    // findOne will return the document based on the filter given
    if(!user){
      throw new Error("Invalid Credentials email")
    }
    const isPasswordValid =  await user.validatePassword(password)
    // const isPasswordValid = await bcrypt.compare(password, user.password) // (first param is password,second param is the hash that we store in db)
    if(isPasswordValid){
      // Create a jwt Token
      // const token = await jwt.sign({id:user._id},"dev-tinder-secret-key-6718356", { expiresIn: '7d' })
      const token = await user.getJWT()
      console.log("token from log in",token)
      // Add the JWT Token to the cookie and sending the cookie to the user
      // res.cookie('token','actual token') 
      // {id:user._id} >> This is the data that needs to be stored in JWT Token
      // thus the token generated will have the user id of the user hidden inside it 
      // dev-tinder-secret-key-6718356 this is the secret key known only to the srever
      // when we decode the token later it is this id that we get as the decoded message >> {id:user._id}

      res.cookie('token',token) 
      res.send("Login Successfull")
    }else{
      throw new Error("Invalid credentials pass")
    }
  }catch(err){
    console.log(err);
    res.status(400).send("Log in Error");
  }
})
// =================================================================

// Find all users
app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to fetch from db");
  }
});
// =================================================================

// Profile section
app.get("/profile", async (req, res) => {
  // the below login needs to be written for all apis that require authentication
  // so we can user a middleware for user authentication for all the apis
  try {
    const cookies = req.cookies
    console.log("cookies from /profile",cookies) // this will give undefined
    // so we need a library called cookie-parser

    const {token} = cookies
    // if token is valid proper response can be given
    // else go to login
    if(!token){
      throw new Error("Invalid token") 
    }

    const decodedMessage = await jwt.verify(token,"dev-tinder-secret-key-6718356")
    console.log(decodedMessage)
    const {id} = decodedMessage
    const user = await User.find({_id:id})    
    res.send(user)
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to fetch the profile");
  }
});

// =================================================================
app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
  // userAuth is a middleware thats added for authentication
  // if its not added "/sendConnectionRequest" can be accessed without even logging in
  // when we log in we are getting a token store in a cookie
  // on every request like "/sendConnectionRequest"  that token is send by the client
  // if that token is not valid then we throw an error
  const user = req.user
  res.send(user.firstName + " has send a connection request")
})
// =================================================================
// Find user by email
// app.get('/feed',async(req,res)=>{
//   try{
//     console.log(req.body.emailId)
//     const user = await User.find({ emailId: req.body.emailId});
//     res.send(user)
//   }catch(err){
//     console.log(err)
//     res.status(400).send('Failed to fetch from db')
//   }
// })

// =================================================================
// Delete a user based on the ID
app.delete("/delete", async (req, res) => {
  try {
    console.log("id", req.body.id);
    const user = await User.findOneAndDelete({ _id: req.body.id });
    console.log("==", user); // this user will be the one thats removed based on the id
    res.send("User Deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to delete the user");
  }
});
// =================================================================
// Update a user based on the ID
app.patch("/update/:id", async (req, res) => {
  try {
    const data = req.body;
    
    
    if(!validateEditProfileData){
      throw new Error('Update not allowed for this field')
    }
    // skills cannot have more than 5 items 
    if (req.body.skills?.length>=5) {
      throw new Error("Over Achiever")
    }

    const user = await User.findOneAndUpdate({ _id: req.params?.id }, data, {
      returnDocument:"before",// this is the default value
      runValidators: true,
    });
    // phoneNumber is not present in the user schema.
    // so it will not be added to the db
    console.log("==", user); // this user will be the one thats updated based on the id .Also the value before update is shown.
    res.send("User Updated successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to update the user");
  }
});
// =================================================================

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
