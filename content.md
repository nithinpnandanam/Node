* Node js has a event driven architecture capable of asynchronous I/O\
* js is a synchronous single threaded language\
* Refer Image 1 : reading a file,setTimeout and api calls are asynchronous operations\
* Refer Image 2 
* In languages like c and cpp we have to allocate and de allocate memory\
* But in languages like js, memory management and garbage collection is done automatically\
* GEC is created within the call stack and the code there runs line by line\
* When a function invocation is happening another execution context is created\
* Fianlly when al the code gets executed within the function execution context then it is popped out of the call stack\
* The js engine does not have the concept of timer\
* Node js gives some super powers to the js engine\
* Now js engine can make use of timeouts and other functionalities provided by the OS\
* Node js has a library called libuv\
* js engine makes use of this library to get access to the benefits offered by the operating sysytem