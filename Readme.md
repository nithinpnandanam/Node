# Usage of Ref and Populate

* Refer ```connectionRequest.js,request.js``` and ```user.js```

## Usage of Array.from()
* Array.from() creates a new array 

```
const str = "hello";
const arr = Array.from(str);
console.log(arr); // ["h", "e", "l", "l", "o"]

```

```
const set = new Set([1, 2, 3, 3, 4]);
const arr = Array.from(set);
console.log(arr); // [1, 2, 3, 4]

```

## Pagination

* ```/feed?page=1&limit=10 => 1-10```
* ```/feed?page=2&limit=10 => 11-20```
* ```/feed?page=3&limit=10 => 21-30```

* Mongo db functions for pagination
    * .skip()
        * how much data we need to skip
    * .limit()

* .skip(0) and .limit(10) means do not skip any data and show 10 entries
* ```/feed?page=2&limit=10 ```
    * entries from 11-20 must be shown
    * limit = 10
    * skip = (page-1)*limit