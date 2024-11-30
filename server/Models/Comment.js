const mongoose = require('mongoose');

const comment = new mongoose.Schema({
  username: { type: String, index: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', index : 1},
  content: { type: String, required: true },
  upvote : {type : Number, default : 0},
  downvote : {type : Number, default : 0},
  createdAt: { type: Date, default: Date.now },
});

comment.index({ postId : 1 });
comment.index({ username : 1 });

const Comment = mongoose.model('Comment', comment);
module.exports = Comment;