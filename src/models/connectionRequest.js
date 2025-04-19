const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: mongoose.ObjectId,
      required:true
    },
    toUserID: {
      type: mongoose.ObjectId,
      required:true
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not supported",
        //  Mongoose replaces {VALUE} with the value being validated.
      },
      required:true
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
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserID)){
        throw new Error("Cannot send request to yourselves")
    }
    next()
})
module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
// in the db when a collection is formed this model name will be changed to plural and all letters will be chahges to lowercase