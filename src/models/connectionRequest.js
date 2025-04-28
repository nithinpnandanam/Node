const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: mongoose.ObjectId,
      required:true,
      ref:"User" 
      // reference to the user collection
      // collections means a table
      // connection between two collection is made
      // "User" is the name of the model
    },
    toUserId: {
      type: mongoose.ObjectId,
      required:true,
      ref:"User" 
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interest", "accept", "reject"],
        message: "{VALUE} is not supported",
        //  Mongoose replaces {VALUE} with the value being validated.
      },
      required:true,
      ref:"User" 
    },
  },
  {
    timestamps: true,
  }
);
// its a middleware
// before we are saving to the database this function will be called
connectionRequestSchema.pre('save',function(next){
    const connectionRequest = this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send request to yourselves")
    }
    next()
})

connectionRequestSchema.index({fromUserId:1,toUserId:1})
module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
// in the db when a collection is formed this model name will be changed to plural and all letters will be changed to lowercase