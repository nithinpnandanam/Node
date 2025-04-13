# Deep Dive into Apis

---
* Difference between JSON and Javascript Object
    * In json the keys are always a string ```double-quoted```
    * JS object not neccesarily like that 
---
* Refer Image1
* if we want to send payload >> ```go to Body``` >> ```select raw``` >> ```Select JSON format```
---
* we are getting the payload in a JSON Format
* So we use a middleware to convert it into a js object
* ```app.use(express.json())```
* this middleware is present in express by default
* ```app.use(middleware)``` 
    * This is exactly the same behavior internally as app.use("/")
    * If no path is given, Express defaults to /.
    * ```app.use("/", middleware)```
    * This registers the middleware for all paths that start with / : which basically means every request.
---