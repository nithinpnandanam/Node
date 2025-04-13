const URI =
  "mongodb+srv://test-2-username:e1FW3rv3Gov3IKLr@dev-tinder-cluster.jxrxjyi.mongodb.net/?retryWrites=true&w=majority&appName=dev-tinder-cluster/db-test";
// URI = connection url/database-name
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(URI);
};


module.exports = {
  connectDB
}