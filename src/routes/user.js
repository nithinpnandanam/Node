const express = require("express");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

router.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const data = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interest",
    }).populate("fromUserId", "firstName lastName skills about");
    // the first parameter in populate is where we wrote ref:"User"
    // refer the schema ConnectionRequest.Using fromUserId we had made a connection to the User model or User collection
    // .populate("fromUserId",['firstName', 'lastName', 'skills', 'about'])
    // this is an alternative to 'join' in realational databases databses Mysql
    res.json({
      message: "Received request",
      data,
    });
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

// this api aims to get the list of all connections of the user
// if the login user sends a requets to another user and if the other user accepts the requests then its a connection
// Also if the login user accepts a connection requests that it received then also its a connection

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { status: "accept", toUserId: loggedInUser._id },
        { status: "accept", fromUserId: loggedInUser._id },
      ],
    })
      .populate("fromUserId", "firstName lastName skills about")
      .populate("toUserId", "firstName lastName skills about");
    const fromUserData = connectionRequests.map((document) => {
      if (loggedInUser._id.equals(document.fromUserId._id)) {
        return document.toUserId;
      }
      return document.fromUserId;
    });
    res.json({
      message: "Fetched all connections of the user",
      data: fromUserData,
    });
  } catch (err) {
    res.send("Error : " + err.message);
  }
});

// const connectionRequests = await ConnectionRequest.find({
//     $or:[
//         {status:'accept',toUserId:loggedInUser._id},
//         {status:'accept',fromUserId:loggedInUser._id}
//     ]
// }
// ).populate("fromUserId",'firstName lastName skills about')

// gunther to monica request send and it got accepeted
// we are logged in as monica
// we need info of fromUserId
// our code handles this case
// When we are logged in as gunther we need info of toUserId
// but we will get info of fromUserId that is Gunther
// so we use .populate("toUserId",'firstName lastName skills about')

// if(loggedInUser._id===document.fromUserId._id){
//     return document.toUserId
// }
// we cannot compare like this
// ObjectId  are different instances even if they represent the same value.
// console.log(loggedInUser._id.toString() === document.fromUserId._id.toString()); Also ✅

router.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // first of all we need to find every request we send and all request we received
    const totalRequests = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }).select("fromUserId toUserId status");
    // then we need to filter all those we dont want to see
    const hiddenFromFeedUsers = new Set(); // this is how we initialise a set 
    // in a set there wil not be any duplicate elements
    totalRequests.forEach((req) => {
        hiddenFromFeedUsers.add(req.fromUserId.toString()); // using add method we add elements to a set 
        hiddenFromFeedUsers.add(req.toUserId.toString());
    });

    console.log("loggedInUser",loggedInUser._id)
    console.log("hiddenFromFeedUsers",hiddenFromFeedUsers)
    
    const usersInFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenFromFeedUsers) } },
        { _id: { $ne: loggedInUser._id } }, // this is not actually needed since we will get this id from hiddenFromFeedUsers
      ],
    }).select("firstName skills gender");
    // _id is from the User Model
    res.json({
      message: "Uers in Feed",
      data: usersInFeed,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = router;
