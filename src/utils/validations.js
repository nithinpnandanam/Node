const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, age, about, skills, photUrl } = req.body;

  if (!firstName || typeof firstName !== "string") {
    throw new Error("First name is not valid!");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password!");
  }

  if (!Array.isArray(skills)) {
    Array.isArray(skills)    
    throw new Error("Skills must be an array of strings!");
  }

  if (skills.length > 5) {
    throw new Error("Skills array should not contain more than 5 items!");
  }

  const allSkillsAreStrings = skills.every((skill) => typeof skill === "string");
  if (!allSkillsAreStrings) {
    throw new Error("Each skill must be a string!");
  }

  if (!validator.isURL(photUrl)) {
    throw new Error("Photo URL must be a valid URL!");
  }

  if (typeof age !== "number" || isNaN(age)) {
    // if age is NaN then typeof NaN is a number
    // so another validation is given in he OR statement isNaN
    // isNaN(NaN) is true
    throw new Error("Age must be a valid number!");
  }

  if (typeof about !== "string" || about.length > 30) {
    throw new Error("About must be a string with within 30 characters!");
  }
};


const validateEditProfileData = (req) => {
  // Fields like email, password, age, etc. cannot be edited
  const allowedUpdates = ["photUrl", "gender", "about", "skills"];

  // Check if only allowed fields are being updated
  const isEditAllowed = Object.keys(req.body).every((field) => allowedUpdates.includes(field));
  if (!isEditAllowed) {
    return false;
  }

  // Now apply field-level validation for editable fields
  const { photUrl, gender, about, skills } = req.body;

  if (!validator.isURL(photUrl)) {
    throw new Error("Photo URL must be a valid URL!");
  }

  if ((typeof about !== "string" || about.length >30)) {
    throw new Error("About must be a string with within 30 characters!");
  }

  if (!Array.isArray(skills)) {
    throw new Error("Skills must be an array of strings!");
  }
  if (skills.length > 5) {
    throw new Error("Skills array should not contain more than 5 items!");
  }
  const allSkillsAreStrings = skills.every((skill) => typeof skill === "string");
  if (!allSkillsAreStrings) {
    throw new Error("Each skill must be a string!");
  }
  
  return true;
};


module.exports = {
  validateSignUpData,
  validateEditProfileData,
};

// if (!firstName || !lastName) {
//     throw new Error("Name is not valid!");
// }
// lets say lastName is not a mandatory field .
// so user might not send it
// but then the error will be shown as lastName is undefined which is a falsy statement and its negation gives the condition true
// so removed the check for lastName
