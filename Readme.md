## Phases Overview
* Refer Image 1
* timers: this phase executes callbacks scheduled by setTimeout() and setInterval().
* pending callbacks: executes I/O callbacks deferred to the next loop iteration.
* idle, prepare: only used internally.
* poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
* check: setImmediate() callbacks are invoked here.
* close callbacks: some close callbacks, e.g. socket.on('close', ...).
------------------------------------------------------------------------------------------------
* One cycle of the event loop is called tick
---
