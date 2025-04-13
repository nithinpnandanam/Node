const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String, // String is shorthand for {type: String}
  lastName: String,
  emailId: String,
  password: String,
  age: Number,
  gender: String,
});

module.exports = mongoose.model("User", userSchema);
// name of the model is the first param
// second param is the schema
// Here we are creating a collection (table)