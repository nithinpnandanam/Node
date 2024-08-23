* Node js has a event driven architecture capable of asynchronous I/O
* js is a synchronous single threaded language
* Refer Image 1 : reading a file,setTimeout and api calls are asynchronous operations
* Refer Image 2 
* In languages like c and cpp we have to allocate and de allocate memory
* But in languages like js, memory management and garbage collection is done automatically
* GEC is created within the call stack and the code there runs line by line
* When a function invocation is happening another execution context is created
* Fianlly when al the code gets executed within the function execution context then it is popped out of the call stack
* The js engine does not have the concept of timer
* Node js gives some super powers to the js engine
* Now js engine can make use of timeouts and other functionalities provided by the OS
* Node js has a library called libuv
* js engine makes use of this library to get access to the benefits offered by the operating system
* Node js is asynchronous because of libuv
* Synchronous code can be managed by v8 engine alone
* but asynchronous operations can be managed only with the help of libuv
* Refer Image 5
* when multiplyFn is invoked a function execution context is created 
* when that function is executed it is pushed out of the call stack
* Then all the variables that was created inside the function will be garbage collected
* when console.log(c) is printed then GEC is pushed out of the call stack
* When js engine executes the js code synchronously it comes across an api call,setTimeout and fileReading
* The Js engine asks libuv to handle such operations
* A,B,C in image 5 are the call back functions
* Once the file is read or any other asynchronous operation is complete the callback function say C moves to the call stack for execution by creating an execution context
* Once its executed the execution context is pushed out of the call stack
* Node js is asyncronous
* js engine is synchronous
* We normally say JS engine can do asynchronous I/O (aka non blocking I/O)
