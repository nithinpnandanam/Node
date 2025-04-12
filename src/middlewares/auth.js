const adminAuth = (req, res, next) => {
  console.log("Authentication of Admin check");
  const token = "abc"; // from user
  const isAdminAuthorised = token === "abcdd";
  if (!isAdminAuthorised) {
    res.status(401).send("unauthorized request for admin");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
    console.log("Authentication of User check");
    const token = "abc"; // from user
    const isUserAuthorised = token === "abc";
    if (!isUserAuthorised) {
        res.status(401).send("unauthorized request for user");
    } else {
        next();
    }
};


module.exports={
    adminAuth,
    userAuth
}