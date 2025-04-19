# Compound Indexes

---
* An index is a data structure that MongoDB uses to quickly find documents in a collection without scanning every document (which is slow).
```
emailId: {
  type: String,
  index: true
}

```
* index: true
    * This creates a regular index for that field, improving read/query performance on that field.
* unique: true
    * This creates a unique index, meaning:
    * It prevents duplicates in that field
    * It also creates an index under the hood

* If unique:true is already set, then index: true is not needed separately
* in our log-in api email id is checked in db so indexing is needed
---
* A ```compound index``` is an index on two or more fields together.
* This is helpful when you're querying multiple fields at once and want to speed it up.
* ```connectionRequestSchema.index({ fromUserId: 1, toUserID: 1 })```
    * Create an index where documents are filtered/sorted by fromUserId first, then toUserID
```
await ConnectionRequest.findOne({
  $or: [
    { fromUserId, toUserID },
    { fromUserId: toUserID, toUserID: fromUserId }
  ]
});

Since we are using a query like this in the schema file indexing is made
```
---
* Indexing every field is not recommended
    * Indexes take space — more indexes = more disk usage
    * Every insert / update has to update all indexes too
    * MongoDB uses a query planner — like a brain that decides:
    * If you have too many indexes, the planner might:
        * Take longer to decide
        * Pick the wrong index (leading to slower queries)
        * Use no index at all!
---
