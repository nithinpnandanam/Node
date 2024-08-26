const http = require("http")
const server = http.createServer((req, res) => {
    if (req.url === '/getSecretData') {
        res.end("2578 is your secret data");
    } else {
        res.end("Hi from server");
    }
});
server.listen(7777)
// if we run this file the server will be created on port 7777 and the server will be listening to any requests
// this is evident in the terminal
// http is a core node module
// const http = require("node:http")
// can also be written in the above fashion
// http://localhost:7777/getSecretData 
// check to see the result
// Now we are using http module to create a http server
// This method is difficult to handle all the routes
