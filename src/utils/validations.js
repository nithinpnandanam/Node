const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password,age,about,skills,photUrl } = req.body;
  if (!firstName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

const validateEditProfileData = (req) => {
  // fields like email cannot be updated
  const allowedUpdates = ["photUrl", "gender", "about", "skills"];

  const isEditAllowed = Object.keys(req.body).every((element) => {
    return allowedUpdates.includes(element);
  });

  return isEditAllowed;
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
