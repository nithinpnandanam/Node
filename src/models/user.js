const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new Schema({
  firstName: {
    type:String,
    required:true,
    minLength:3,
    maxLength:20

  },
  lastName: {
    type:String
  },
  emailId: {
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    validate:(value)=>{
      if(!validator.isEmail(value)){
        throw new Error('Email is not valid')
      }
    }
  },
  password: {
    type:String,
    required:true,
    trim:true, //  remove leading and trailing whitespace from a string.
    validate:(value)=>{
      if(!validator.isStrongPassword(value)){
        throw new Error('Password is not strong')
      }
    }
    },
  age: {
    type:Number,
    min:18
  },
  gender: {
    type:String,
    validate:(value)=>{
      if(!['male','female','other'].includes(value)){
        throw new Error('Gender is not valid')
      }
    }
  },
  photUrl:{
    type:String,
    default:"https://mui.com/static/images/avatar/2.jpg",
    validate:(value)=>{
      if(!validator.isURL(value)){
        throw new Error('URL is not valid.Please provide a correct URL')
      }
    }
  },
  about:{
    type:String,
    default:"Default Value is shown"
  },
  skills:{
    type:[String] // This shows its an array of string
  }
},{
  timestamps:true
});

// offloading some functions to schema methods
userSchema.methods.getJWT = async function(){
  // we areusing 'this'
  // so arrow functions cannot be used
  const user = this
  const token = await jwt.sign({id:user._id},"dev-tinder-secret-key-6718356", { expiresIn: '7d' })
  return token
  
}
userSchema.methods.validatePassword = async function(passwordByUser){
  const user = this
  const isPasswordValid = await bcrypt.compare(passwordByUser, user.password) 
  return isPasswordValid

}
module.exports = mongoose.model("User", userSchema);

// firstName: String,  String is shorthand for {type: String}

// name of the model is the first param
// second param is the schema
// Here we are creating a collection (table)

// Creates a model called User
// Internally, Mongoose pluralizes and lowercases the model name to get the collection name:
// in compass we will find the name of the collection to be users

// this validate function for gender runs only when a new document is created.
// if we try to edit a document validate function does not run by default
// we need to specifically add options as shown below

// {
//   timestamps:true
// }
// this will add createdAt and updatedAt