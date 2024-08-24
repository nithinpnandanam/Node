* Nodejs is capable of asynchronous I/O or Non blocking I/O because of libuv
* when there are asynchronous tasks js engine offloads it to libuv
* Refer image 1
* If several callbacks are completed at the same time then these call back will be registered in the callback queues
* Event loop executes these callbacks when the call stack is empty
* In close phase any socket connection if present is closed.
* refer Image 2