const jwt = require('jsonwebtoken');
const User = require('../models/user')
const userAuth = async(req, res, next) => {
  try{
    // req.cookies = {"token":"hjasdhjkasdhjkasdhjk"} this will be the format
    const {token} = req.cookies
    if(!token){
      throw new Error("Token is not valid")
    }
    const decodedMessage = await jwt.verify(token,"dev-tinder-secret-key-6718356")
    const {id} = decodedMessage
    const user = await User.find({_id:id})
    if(!user){
      throw new Error('User not found')
    }
    req.user = user[0] // this is done so that we use the value of user in the parent
    next()

  }
  catch(err){
    res.status(400).send('Authentication Failed')
  }
};

// This middleware is created so that we can use this on every api that requires user authentication.

module.exports={
  userAuth
}