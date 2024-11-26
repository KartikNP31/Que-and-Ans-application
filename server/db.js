const mongoose = require('mongoose');
require('dotenv').config();


const uri = process.env.mongoURI;
const dbConnection = async () => {
  await mongoose.connect(uri
    , {
      serverSelectionTimeoutMS: 30000,
    }
  ).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  })
}



// const { MongoClient, ServerApiVersion } = require('mongodb');

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// const dbConnection = async () => {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch {
//     console.dir;
//   } 
//   finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }


module.exports = dbConnection;
