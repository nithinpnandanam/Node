
const express = require('express')
const router = express.Router()
const {userAuth} = require('../middlewares/auth')
router.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    // userAuth is a middleware thats added for authentication
    // if its not added "/sendConnectionRequest" can be accessed without even logging in
    // when we log in we are getting a token store in a cookie
    // on every request like "/sendConnectionRequest"  that token is send by the client
    // if that token is not valid then we throw an error
    const user = req.user
    res.send(user.firstName + " has send a connection request")
  })
module.exports = router