## Thread pool
* Reading a file is an asynchronous operation and it is given to libuv to be take care of
* Refer Image 3
* libuv assigns a thread from the thread pool for this file reading operation
* when the file reading operation is going on that particular thread cannot be used for any other purpose
* a thread is like a container where we can run a piece of code
* crypto functions are asynchronous and takes a lot of time
* one of the threads are used for implementing crypto
* initialy there are 4 threads in the thread pool by default
* uv_threadpool_size = 4
* lets say there are 5 file reading operaions thats happening simultaneously
* 4 threads are available by default
* for the fifth file reading operation to take place one of the default threads must be available after its operation[Thus a small delay is present]
* fs,crypto and dns.lookup [Refer Image 3] uses threadpool as these are heavy operations that can even block a thread
## is Node js single or multi threaded ?
* if its a synchronous task then Node js is single threaded
* but if asynchronous tasks like reading file,password encryption using crypto method,Node js acts as multi thread
---
* Refer Image 4
* lets say 100 users are accesing or hitting the api
* 100 socket connections are formed
* 100 threads are not used 
* hence thread pool is not used in this condition
* file descriptor (fds) or socket descriptor
* lets say we are requesting data by making a socket connection to the server
* if the server wants to write some data in the connection its a blocking operation
* for the above operation a thread is required
* we cant have 100 threads for 100 such requests
* This is handled with the help of ***scalable I/O event Notification mechanism [epoll and kqueue ]***
* at the kernel level it is handled by epoll (Linux) and kqueue(MacOS)
* for each socket connection there is a fds or socket decriptor
* ***epoll descriptor*** is a colletion of fds or socket decriptor
* So one epoll descriptor can handle multiple connections.
* This epoll descriptor monitors all these connections simultaneously, waiting for any activity (like data becoming available to read or the ability to write without blocking).
* Not every connection is always actively transferring data. 
* Some connections might be idle, waiting for the next operation (either reading or writing).
* If any activity happens (event happens) on any one of the connections managed by epoll descriptor, epoll being a Notification mechanism  will notify libuv 
* libuv on the poll phase will execute the callback via V8 engine
* Refer Image 5
* When an event happens (e.g., data arrives), epoll notifies libuv, which, during the poll phase, executes the associated callback function using the V8 engine. 
* This callback handles the event, such as processing incoming data or writing data to the connection.
* This design is key to Node.js's ability to handle a large number of simultaneous connections efficiently without requiring a separate thread for each connection, making it ideal for building scalable network applications.
---
1. ### Data Becoming Available to Read
 - **Receiving Data:** When a client sends data to the server, this data arrives at the server's network interface and is stored in a buffer associated with the socket connection.
 - **Socket Readiness:** The socket descriptor (fd) representing this connection becomes "readable" when there is data available in the buffer that the server can read.
 - **Non-Blocking I/O:** In a non-blocking I/O model (used by Node.js), the server doesn't continuously check the socket to see if data has arrived. Instead, it relies on mechanisms like epoll.
 - **Epoll Notification:** Epoll monitors this socket descriptor. When data arrives and the socket is ready to be read (i.e., there’s data in the buffer), epoll will notify the application (libuv in Node.js) that this socket is ready for a read operation.
 - **Callback Execution:** Libuv then triggers the corresponding callback function to handle the incoming data (e.g., reading the data and processing it).
2. ### Ability to Write Without Blocking
 - **Sending Data:** When the server wants to send data back to the client, it needs to write this data to the socket.
 - **Blocking vs. Non-Blocking Writes:**
  - In a blocking I/O model, the server might get stuck (or "blocked") if it tries to write to a socket when the network buffer is full or not ready to accept more data. This would cause the server to wait until the buffer is ready, potentially stalling other operations.
  - In a non-blocking I/O model, the server avoids this problem by checking if the socket is ready to accept more data before attempting to write.
 - **Socket Readiness:** A socket is considered "writable" when the network buffer has enough space to accept more data. In other words, the server can write data to the socket without being blocked.
 - **Epoll Notification:** Epoll monitors the socket for this condition. When the buffer is ready, epoll notifies libuv that the socket is writable.
 - **Callback Execution:** Libuv then triggers the associated callback function to perform the write operation. This ensures that the server only writes when it won’t be blocked, allowing it to efficiently manage multiple connections.
---
1. ### Data Becoming Available to Read:
 - A client sends a request to the server.
 - Epoll detects that data has arrived at the server's socket.
 - Libuv is notified, and the callback responsible for reading and processing the data is executed.

2. ### Ability to Write Without Blocking:
 - The server needs to send a response to the client.
 - Epoll monitors the socket to determine when it’s safe to write without blocking.
 - Once the socket is writable, libuv is notified, and the callback responsible for sending the data is executed.
---

