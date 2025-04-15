# Password Encryptions

---
* ```Salt``` : Random string added to password before hashing 
* ```saltRounds``` : Number of times the algorithm runs 
* higher rounds >> 	More secure, but slower to compute
* ```npm i bcrypt``` for password encryption
---
```
 try{
    const {emailId,password} = req.body
    const user = await User.findOne({emailId:emailId})
    console.log("user",user)
    // findOne will rteurn null if there is no match
    // findOne will rteurn the document based on the filter given
    if(!user){
      throw new Error("Invalid Credentials email")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password) // (first param is password,second param is the hash that we store in db)
    if(isPasswordValid){
      res.send("Login Successfull")
    }else{
      throw new Error("Invalid credentials pass")
    }
  }catch(err){
    console.log(err);
    res.status(400).send("Log in Error");
  }
```
* That throw immediately jumps to the catch(err) block.
* Any error thrown or rejected in the try block is caught by the catch.
* So in the try block when error thrown ```Log in Error``` is send as the response.

---

