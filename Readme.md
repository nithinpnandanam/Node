# Express Server

* Express is a dependency
* if we check package.json we can see Express as a dependency
```
"dependencies": {
    "express": "^5.1.0",
    "nodemon": "^3.1.9"
}
```
* when we do ```npm i express``` we are downloading the entire code base of express into ```node modules```
* express will be dependent on other dependencies , so that dependencies will also be downloaded in node modules 

* Refer Image 1
    * Lets say express has made some updates
    * if its a patch update then we can simply update our express version
    * Even if its a minor update then also we can  update our express version
    * it will be backward compatible
    * if its a major update then there will be breaking changes
    * we should not do breaking changes as it will affect and break our application
* ```^``` ```caret``` in ```^4.x.x``` means auto update the version of the dependency if there is a ```minor or patch update```
* the exact version of the dependency is shown in package-lock.json
* ```~``` ```tilde``` in ```~4.2.3``` means it will only do ```patch upadte```
---
* when we make changes everytime we need to restart the server
* if we instal nodemon then that issues is resolved
---