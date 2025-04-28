const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
router.post("/request/send/:status/:userId", userAuth, async (req, res) => {
  // the sattus can be either ignore or interest
  try {
    const user = req.user;
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    const allowedStatus = ["ignore", "interest"];
    // These can only be valid status.
    if (!allowedStatus.includes(status)) {
      throw new Error("Not a valid status");
    }
    // we can use a random id and send that request from the client
    // id of toUser must be there in the db
    // if its not there we need to handle that case also
    const toUser = await User.find({ _id: toUserId });
    // toUser will be an array since find is used
    if (toUser.length === 0) {
      throw new Error("User not found");
    }
    // lets say we are trying to ignore or show interest
    // but before that we need to make sure that already a request has been sent from A to B or from B to A
    // const existingConnectionRequest = await ConnectionRequest.findOne({
    //   $or: [
    //     { fromUserId, toUserId },
    //     {
    //       fromUserId: toUserId,
    //       toUserId: fromUserId,
    //     },
    //   ],
    // });
    // if (existingConnectionRequest){
    //   throw new Error("Already a request is send")
    // }

    // removed the or statement since we want two seperate error messages for two OR cases

    const directRequest = await ConnectionRequest.findOne({
      fromUserId,
      toUserId,
    });

    if (directRequest) {
      throw new Error(
        "You have already sent a connection request to this user."
      );
    }

    const reverseRequest = await ConnectionRequest.findOne({
      fromUserId: toUserId,
      toUserId: fromUserId,
    });

    if (reverseRequest) {
      throw new Error("This user has already sent you a connection request.");
    }

    //===================================================
    // we should not be able to send request to ourselves
    // we are using schema validations using 'pre' for implementing the above functionality
    // its somewhat similar to schema methods

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequest.save();
    if (toUser.length > 0) {
      res.json({
        message:
          status === "ignore"
            ? `${req.user.firstName} has ignored ${toUser[0].firstName}` 
            : `${req.user.firstName} has shown interest to ${toUser[0].firstName}`,

        data,
      });
    } else {
      res.send("User Not found");
    }
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});
router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const allStatus = ["accept", "reject"];
      const { status, requestId } = req.params;
      if (!allStatus.includes(status)) {
        throw new Error("Invalid status");
      }
      // we are trying to accept or reject a request
      // we should be able to do that for all documuments whose toUserId === logged in users id
      const connectionRequest = await ConnectionRequest.findOne({
        toUserId: loggedInUser._id,
        status: "interest",
        _id: requestId,
      });
      console.log("connectionRequest", connectionRequest);
      // Why requestId is used ?
      // There is a logged in user
      // when he checks he can find a list of requets that he can accept or reject
      // we can query all requests thats having status interest and thats addressed to him
      // like that there will be 5 requets
      // each of these 5 requests will be having a _id.
      // so while accepting _id is also needed.
      if (!connectionRequest) {
        throw new Error("No interest requests found");
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "Connection request " + status + "ed",
        data,
      });
    } catch (err) {
      res.send("Error: " + err.message);
    }
  }
);
module.exports = router;
