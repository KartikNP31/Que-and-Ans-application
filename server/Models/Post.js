const mongoose = require('mongoose');

const post = new mongoose.Schema({
  username: { type: String, required : true,  index : true},
  content: { type: String, required : true,},
  tags: [{type : String}],
  createdAt: { type: Date, default: Date.now },
  approved : {type : Boolean, default : false},
  likes : {type : Number, default : 0}
});

// post.index({ username: 1 });

const Post = mongoose.model('Post', post);

module.exports = Post;