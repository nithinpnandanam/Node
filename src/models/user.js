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

//Creates a model called User
// Internally, Mongoose pluralizes and lowercases the model name to get the collection name:
// in compass we will find the name of the collection to be users