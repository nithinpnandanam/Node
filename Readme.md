* Client and server are basically two computers 
* Refer Image 1
* When client want to communicate with the server at first they enable a socket connection
* After the server responds to the client with the required data the socket connection is closed
* when the socket connection is made it follows a TCP/IP protocol
* HTTP and FTP: Protocols for Data Transfer
* Read more about them in http_ftp.md file
* http server means the server sends data to the client by following the rules oh http protocol
* data is send in the form of small small packets to the client
* Refer Inage 3
* while accesing a website at first we send a request to DNS
* This DNS has a mapping of ip address with the domain name 
* So the ip address corresponding to the domain name will be provided to us
* Now we can request data to the ip address thus obtained
* Refer Image 4
* I can create multiple hhtp server corresponding to an ip address which can be differentiated using port number
* the client can connect to the second server using 102.209.1.3:3000
* Refer Image 5 
* If we are refering to namastedev.com/ we are referring to port 3000 [React application]
* If we are refering to namastedev.com/api we are referring to port 3001 [Node application]
* Refer Image 6
* we can host the FE application and BE application on same server ot different server
* we can host the database on different server
* images can be hosted on some other server
* Refer Image 7 [socket and web-socket]
* Initially a socket connection is made
* client requests data from the server
* server provides and then the socket connection is closed
* for web sockets the connection remains for more time period
* grnrrally when api calls ar made socket connectio is used
* web sockets are resource intensive
* when 4,5 web sockets are open it consumes more resources 


