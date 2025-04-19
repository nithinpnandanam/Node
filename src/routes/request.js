const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user')
router.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  // the sattus can be either ignore or interested
  try {
    const user = req.user;
    const fromUserId = req.user._id;
    const toUserID = req.params.userId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    // These can only be valid status.
    if (!allowedStatus.includes(status)) {
      throw new Error("Not a valid status");
    }
    // we can use a random id and send that request from the client
    // id of toUser must be there in the db 
    // if its not there we need to handle that case also
    const toUser = await User.find({_id:toUserID})
    // toUser will be an array since find is used
    if(!toUser){
      throw new Error("User not found")
    }
    // lets say we are trying to ignore or show interest
    // but before that we need to make sure that already a request has been sent from A to B or from B to A
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserID },
        {
          fromUserId: toUserID,
          toUserID: fromUserId,
        },
      ],
    });
    if (existingConnectionRequest){
      throw new Error("Already a request is send")
    }
    // we should not be able to send request to ourselves
    // we are using schema validations using 'pre' for implementing the above functionality
    // its somewhat similar to schema methods

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserID,
      status,
    });
    const data = await connectionRequest.save();
    res.json({
      message: status==='ignored'?req.user.firstName + " has ignored " + toUser[0].firstName:req.user.firstName + " has shown interest to " + toUser[0].firstName,
      data,
    });
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});
module.exports = router;
