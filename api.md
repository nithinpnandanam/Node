
# List of API

---
### authRouter
    * POST /signup
    * POST /login
    * POST /logout

### profileRouter
    * GET /profile/view
    * PATCH /profile/edit
        * for editing profile details
        * for changing password we need different login 
        * so creating a seperate api
    * Patch /profile/change-password : For changing password

### connectionRequestRouter
    * POST /request/send/status/:userId
        * POST /request/send/interest/:userId
        * POST /request/send/ignore/:userId
    * POST /request/review/status/:requestId
        * POST /request/review/accept/:requestId
        * GET /request/review/reject/:requestId

### userRouter
    * GET /user/request/received
    * GET /user/connection
    * GET /user/feed

---
### S tatuses

* we can can either
    * ```ignore``` the user
    * show ```interest``` in the user
* when a connection request is given the user on the other side can
    * ```accept``` the request
    * ```reject``` the request
---