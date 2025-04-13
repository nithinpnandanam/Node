//username : test-2-username
//pass : e1FW3rv3Gov3IKLr
const URI = "mongodb+srv://test-2-username:e1FW3rv3Gov3IKLr@dev-tinder-cluster.jxrxjyi.mongodb.net/?retryWrites=true&w=majority&appName=dev-tinder-cluster"

const { MongoClient } = require('mongodb');
const client = new MongoClient(URI);
const dbName = 'db-test';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('User');
  
    // the following code examples can be pasted here...
    const findResult = await collection.find({}).toArray();
console.log('Found documents =>', findResult);
  
    return 'done.';
  }
  
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());