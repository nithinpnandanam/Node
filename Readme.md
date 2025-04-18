# Express Router

* ```Usecase :``` one router to handle a group of routes 
* authRouter can be used to handle all the apis like /signup,/login,/logout

---
### More about isNaN

```
isNaN("hello")      // true
isNaN(undefined)    // true
isNaN({})           // true
isNaN(NaN)          // true
```

```
isNaN(2)            // false
```

```
isNaN(value) → isNaN(Number(value))
```

```
isNaN('2')          // false
Reason : 
Number('2') → 2
isNaN(2) → false
```
```
isNaN(null)         // false
Reason : 
Number(null) → 0
isNaN(0) → false

```

* typeof NaN = number
---

