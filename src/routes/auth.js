
const express = require('express')
// const app = express();
const router = express.Router()
const {validateSignUpData,validateEditProfileData} = require('../utils/validations')
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { userAuth } = require('../middlewares/auth');


// instead of app.post we can use router.post
router.post("/signup", async (req, res) => {
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
    res.status(400).send("Error saving the user : "+err.message);
  }
});

// User Login
router.post('/login',async (req,res)=>{
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

router.post('/logout',async (req,res)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now())
    })
    res.send("Logout Successfull")

    // we can chain the above two methods
    // res
    // .cookie('token',null,{
    //     expires:new Date(Date.now())
    // })
    // .send("Logout Successfull")
})



module.exports = router