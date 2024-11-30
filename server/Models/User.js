const mongoose = require('mongoose');

const user = new mongoose.Schema({
  clerkId: { type: String, required: true, unique : true}, // Clerk's unique user ID
  email: { type: String, required: true, unique: true, index : true},
  username: { type: String, required: true, unique : true},
  first_name: { type: String },
  last_name: { type: String },
  image_url: { type: String },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "user" },
});

user.index({ email: 1 });


const User = mongoose.model('User', user);

module.exports = User;