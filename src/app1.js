const express = require("express");

const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");

app.use(express.json());
// if we use this middleware the json format coming from the payload will be converted into js object
// then req.body will show the payload else it will be undefined
// =================================================================
app.post("/signup", async (req, res) => {
  // creating a new instance of User model
  console.log(req.body);
  // Create a new row (document) in the users collection using the values passed by the client
  const user = new User(req.body);
  try {
    await user.save(); // This is how we save to a databse
    res.send("User Added successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error saving the user");
  }
});
// =================================================================

// Find all users
app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to fetch from db");
  }
});

// =================================================================
// Find user by email
// app.get('/feed',async(req,res)=>{
//   try{
//     console.log(req.body.emailId)
//     const user = await User.find({ emailId: req.body.emailId});
//     res.send(user)
//   }catch(err){
//     console.log(err)
//     res.status(400).send('Failed to fetch from db')
//   }
// })

// =================================================================
// Delete a user based on the ID
app.delete("/delete", async (req, res) => {
  try {
    console.log("id", req.body.id);
    const user = await User.findOneAndDelete({ _id: req.body.id });
    console.log("==", user); // this user will be the one thats removed based on the id
    res.send("User Deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to delete the user");
  }
});
// =================================================================
// Update a user based on the ID
app.patch("/update/:id", async (req, res) => {
  try {
    const data = req.body;
    // fields like email cannot be updated
    const allowedUpdates = ['photUrl','gender','about','skills']
    const isUpdateAllowed = Object.keys(data).every((element)=>{
      return allowedUpdates.includes(element)
    })
    if(!isUpdateAllowed){
      throw new Error('Update not allowed for this field')
    }
    // skills cannot have more than 5 items
    if (req.body.skills?.length>=5) {
      throw new Error("Over Achiever")
    }

    const user = await User.findOneAndUpdate({ _id: req.params?.id }, data, {
      returnDocument:"before",// this is the default value
      runValidators: true,
    });
    // phoneNumber is not present in the user schema.
    // so it will not be added to the db
    console.log("==", user); // this user will be the one thats updated based on the id .Also the value before update is shown.
    res.send("User Updated successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to update the user");
  }
});
// =================================================================

connectDB()
  .then(() => {
    console.log("Connected to Database");
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  })
  .catch(() => {
    console.error("Database not connected");
  });
