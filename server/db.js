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



module.exports = dbConnection;
