
const express = require("express")
const { userAuth } = require("../middlewares/auth")
const router = express.Router()
const ConnectionRequest = require('../models/connectionRequest')

router.get("/user/request/received",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user
        const data = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:'interest'
        }).populate("fromUserId",'firstName lastName skills about')
        // the first parameter in populate is where we wrote ref:"User"
        // refer the schema ConnectionRequest.Using fromUserId we had made a connection to the User model or User collection
        // .populate("fromUserId",['firstName', 'lastName', 'skills', 'about'])
        // this is an alternative to 'join' in realational databases databses Mysql
        res.json({
            message:"Received request",
            data
        })

    }catch(err){
        res.status(400).send("Error "+ err.message)
    }
})

// this api aims to get the list of all connections of the user
// if the login user sends a requets to another user and if the other user accepts the requests then its a connection
// Also if the login user accepts a connection requests that it received then also its a connection

router.get('/user/connections',userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {status:'accept',toUserId:loggedInUser._id},
                {status:'accept',fromUserId:loggedInUser._id}
            ]
        }
        ).populate("fromUserId",'firstName lastName skills about').populate("toUserId",'firstName lastName skills about')
        const fromUserData = connectionRequests.map((document)=>{
            
            if (loggedInUser._id.equals(document.fromUserId._id)) {
                return document.toUserId;
            }
            return document.fromUserId
        })
        res.json({
            message:"Fetched all connections of the user",
            data:fromUserData
        })
    }catch(err){
        res.send("Error : " + err.message)
    }
})

module.exports = router;


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

