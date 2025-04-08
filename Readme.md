# Microservices And Monolith

### Monolith Architecture

* development speed is less since many peaople are working in the same repo    
* a single code repo    
* Tough to scale [Everyday many lines of code is merged]    
* single deployment    
* when one line of code is changed the entire application needs to be deployed    
* Then the entire test cases needs to be run again 
* Tech stack cannot be changed    
* Infrastructure cost is less    
* when a project grows its difficult to manage using monolith architecture  
* End-to-End Testing of the application is easy since whole flow is in a single app

### Microservices Architecture  

* development speed is more .  
* A service meaans its like a seperate project   
* Parallelly we can work on many microservices.   
* Microservice can be made for FE,BE,Authentication,Notification,Analitics...
* In Uber there is microservice just for calculating the fare 
* scalability is easy.
* if we want to scale a particular microservice only then its  easily  possible
* each microservice needs to be deployed    
* when one line eof code is changed microservice associated needs to be deployed    
* different tech stack can be used for different microservices   
* Refer Image 3 : the admin dashboard can be written in react   
* Based on Image 3 there are 4 diffrent microservices.
* if the apllication grows then the backend can be divided into diferrent microservices like Authentication,Notification,Analitics
* the application uised by the customer can be written in next js    
* Infrastructure cost is more    
* For simple projects microservices are not needed    
* If one microservice is down the rest of the microservices are not affected: fault isolation    
* testing is hard since different microservices are connected   
* End-to-End Testing of the application is hard since we have to test across services
* maintenance and rewamps are easy for microservices     
