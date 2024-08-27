## Phases Overview
* Refer Image 1
* ***timers:*** this phase executes callbacks scheduled by setTimeout() and setInterval().
* ***pending callbacks:*** executes I/O callbacks deferred to the next loop iteration.
- From the last cycle there might be some call backs from poll phase that needs to be executed
* ***idle, prepare:*** only used internally.
* ***poll***: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
* ***check:*** setImmediate() callbacks are invoked here.
* ***close callbacks:*** some close callbacks, e.g. socket.on('close', ...).
---
* One cycle of the event loop is called tick
* I/O loop is also called event loop
* We know the event loop is waiting in the poll phase
* if all the callbacks are empty and there is a timer that takes 7 seconds
* then the event loop waits in the poll phase and after 7 seconds it executes the callback of the timer by moving to the timer phase
---
