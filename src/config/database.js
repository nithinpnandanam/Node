
const URI = "mongodb+srv://test-2-username:e1FW3rv3Gov3IKLr@cluster0.nwoltxh.mongodb.net/dev-tinder-db?retryWrites=true&w=majority&appName=Cluster0"
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(URI);
};


module.exports = {
  connectDB
}