# JWT Cookies Authentication

### Authentication Workflow
    * when the user logs in using email and password a jwt token is created and stored in a cookie
    * This cookie is send back to the client
    ```
    # This is how I send the cookie
    res.cookie('token','uadhasdiljjkjlaBHKJLAOLbjdaiosdtvwSLK')
    ```
    * The cookie is stored by the client
    * The client on every request will bring the cookie along with it
    * The server performs validations 
    * If the JWT token in cookie is expires the server will ask the client to log in again
---
* ```npm i cookie-parser``` for reading the cookie this package is needed
```
const cookies = req.cookies
console.log(cookies) 
```
* this will give undefined
* so we need a library called cookie-parser
```
// middleware used
app.use(cookieParser())
```
---
* we can set expiry for tokens as well as cookies
---

