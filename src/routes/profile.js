const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validations");
const bcrypt = require('bcrypt')
// Profile section
router.get("/profile/view", userAuth, async (req, res) => {
  // the below login needs to be written for all apis that require authentication
  // so we can user a middleware for user authentication for all the apis
  try {
    const cookies = req.cookies;
    console.log("cookies from /profile/view", cookies); // this will give undefined
    // so we need a library called cookie-parser

    const { token } = cookies;
    // if token is valid proper response can be given
    // else go to login
    if (!token) {
      throw new Error("Invalid token");
    }

    const decodedMessage = await jwt.verify(
      token,
      "dev-tinder-secret-key-6718356"
    );
    console.log(decodedMessage);
    const { id } = decodedMessage;
    const user = await User.find({ _id: id });
    if (!user) {
      res.send("User Not Found");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to fetch the profile");
  }
});

router.patch('/profile/edit',userAuth,async (req,res)=>{
    try{
        validateEditProfileData(req)
        const loggedInUser = req.user // info about logged in user from the middleware
        const payload = req.body // data that need to be changed 
        Object.keys(payload).forEach((element)=>{
            loggedInUser[element]=payload[element] 
        })
        await loggedInUser.save()
        // if we use res.json it must be object or array that needs to be sent to the user
        res.json({
            message:`${loggedInUser.firstName}'s profile has been updated`,
            data:loggedInUser
        })
         
    }catch(err){
        console.log("err",err)
        res.status(400).send("Invalid Edit Request : "+err.message)
    }
})

// for password change
router.post('/profile/change-password',userAuth,async (req,res)=>{
  try{
    const {currentPassword,newPassword} = req.body
    if (req.user.validatePassword(currentPassword)){
      const passwordHash = await bcrypt.hash(newPassword,10) // this is a asynchronous operation when we refer the documentation.So await is given
      req.user.password = passwordHash
      await req.user.save()
      res.send("Password changed successfully")
  
    }
  }catch(err){
    res.status(400).send("Password not changed "+err.message)
  }
  

})
module.exports = router;
