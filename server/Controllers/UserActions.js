const Comment = require('../Models/Comment');
const Post = require('../Models/Post');
const Tag = require('../Models/Tags');

class UserActions {
  async addPost(reqData) {
    try {
      // console.log("🚀 ~ UserActions ~ addPost ~ reqData:", reqData)
      const content = reqData.question;
      const username = reqData.username;
      const tags = reqData.tags;

      let question = await Post.create({
        content: content,
        username: username,
        tags: tags
      })
      if (!question) {
        return { error: true, msg: 'Internal Server Error' };
      }else{
        for (const tagName of tags) {
          await Tag.findOneAndUpdate(
            { name: tagName },              // Search condition
            { $inc: { count: 1 } },         // Increment count by 1
            { upsert: true, new: true }     // Create tag if not exists
          );
        }
      }
      return { error: false, msg: 'Question Submitted Successfully', data: question };
    }
    catch (error) {
      console.log("🚀 ~ UserActions ~ addPost ~ error:", error)
      return { error: true, msg: error.message }
    }
  }


  async getPost(req) {
    try {
      // console.log("🚀 ~ UserActions ~ getPost ~ req:", req.query)
      const { username, approved, content, tags, page, limit } = req.query;
      // const page = req.query.page || 1;
      // console.log("🚀 ~ UserActions ~ getPost ~ page:", page)
      // const limit = 10;
      const filter = {};
      if (username) filter.username = username;
      if (approved) filter.approved = approved;
      if (content) filter.content = { $regex: content, $options: "i" };
      if (tags) {
        const tagsArray = tags.split(',');
        filter.tags = { $in: tagsArray.map(tag => new RegExp(tag, "i")) };
      }

      const skip = (page - 1) * limit;
      const posts = await Post.find(filter).skip(skip).limit(limit).sort({ likes: -1 });
      const totalResults = await Post.countDocuments(filter);

      if (posts.length === 0) {
        return { error: true, msg: "No posts found matching the criteria.", totalResults:0, status: 404 };
      }
      // const totalPosts = await Post.countDocuments();

      // console.log("🚀 ~ UserActions ~ getPost ~ posts:", posts )
      return { error: false, data: posts, totalResults, start : (page-1)*limit, status: 200 };
    } catch (error) {
      console.log("🚀 ~ UserActions ~ getPost ~ error:", error)
      return { error: true, msg: "Internal Server Error.", totalResults:0, details: error.message, status: 500 };
    }
  }


  async addComment(reqData) {
    try {
      // console.log("🚀 ~ UserActions ~ addComment ~ reqData:", reqData)
      const content = reqData.content;
      const username = reqData.username;
      const postId = reqData.postId;

      let comment = await Comment.create({
        postId: postId,
        username: username,
        content: content,
      })
      // console.log("🚀 ~ UserActions ~ addComment ~ comment:", comment)
      if (!comment) {
        return { error: true, msg: 'Internal Server Error' };
      }
      return { error: false, msg: 'comment Submitted Successfully', data: comment };
    }
    catch (error) {
      console.log("🚀 ~ UserActions ~ addComment ~ error:", error)
      return { error: true, msg: error.message }
    }
  }


  async getComments(req) {
    try {
      const { postId } = req.query;
      const filter = {};
      // if (username) filter.username = username;
      if (postId) filter.postId = postId;
      const comments = await Comment.find(filter).sort({ upvote: -1 });
      // console.log("🚀 ~ UserActions ~ getComments ~ comments:", comments)

      if (comments.length === 0) {
        return { error: true, msg: "No comments found matching the criteria.", status: 404 };
      }
      return { error: false, data: comments, status: 200 };
    } catch (error) {
      console.log("🚀 ~ UserActions ~ getComments ~ error:", error)
      return { error: true, msg: "Internal Server Error.", details: error.message, status: 500 };
    }
  }


  async deletePost(id) {
    try {
      const postId = id;
      const commentExists = await Comment.exists({ postId: postId });
      if (commentExists) {
        const commentDeleteResult = await Comment.deleteMany({ postId: postId });
        console.log("🚀 ~ UserActions ~ deletePost ~ Comment deleted:", commentDeleteResult.deletedCount);
      }
      const post = await Post.findByIdAndDelete(postId);
      if (!post) {
        return { error: true, msg: 'Internal Server Error' };
      }
      return { error: false, msg: 'Post Deleted Successfully', data: post };
    }
    catch (error) {
      console.log("🚀 ~ UserActions ~ deletePost ~ error:", error)
      return { error: true, msg: error.message }
    }
  }

  async deleteComment(id) {
    try {
      const commentId = id;
      const comment = await Comment.findByIdAndDelete(commentId);
      if (!comment) {
        return { error: true, msg: 'Internal Server Error' };
      }
      return { error: false, msg: 'Comment Deleted Successfully', data: comment };
    } catch (error) {
      console.log("🚀 ~ UserActions ~ deleteComment ~ error:", error)
      return { error: true, msg: error.message }
    }
  }

  async updatePost(reqData) { 
    // console.log("🚀 ~ UserActions ~ updatePost ~ reqData:", reqData);
    const { type, postId,  updateLikeCount, updatedPost } = reqData;

    try {
      if(!postId ){
        return { error: true, msg: 'Internal Server Error, Try again' };
      }

      const post = await Post.findById(postId);

      if (!post) {  
        return { error: true, msg: 'Internal Server Error, Try again' };
      }

      if(type === 'upVote' || type === 'downVote'){
        post.likes += parseInt(updateLikeCount.updateLikes);
        post.save();
        return { error: false, msg: `Post ${type === 'upVote' ? 'Liked' : 'Disliked'}`, data: post };
      }
      else{
        post.content = updatedPost.content;
        post.tags = updatedPost.tags;
        post.save();
        return { error: false, msg: 'Post Updated Successfully', data: post };
      }
      
    } catch (error) {
      console.error('Error updating post:', error);
      return { error: true, msg : error.message, status: 500 };
    }
  }

  async approvePost(reqData) {
    // console.log("🚀 ~ UserActions ~ approvePost ~ reqData:", reqData)
    const { postId, approved } = reqData;

    try {
      if(!postId ){
        return { error: true, msg: 'Internal Server Error, Try again' };
      }

      const post = await Post.findByIdAndUpdate({ _id: postId },{$set: { approved: approved }}, { new: true });

      if (!post) {  
        return { error: true, msg: 'Internal Server Error, Try again' };
      }
      
      return { error: false, msg: 'Post Approved Successfully', data: post };
      
    } catch (error) {
      console.error('Error approving post:', error);
      return { error: true, msg : error.message, status: 500 };
    }
  }

  async likeComment(reqData){
    try{
      const { type, _id } = reqData;
      const comment = await Comment.findById(_id);
      if(!comment){
        return { error: true, msg: 'Internal Server Error, Try again' };
      }
      if(type === 'upVote'){
        comment.upvote += 1;
        comment.downvote -= 1 >= 0 ? comment.downvote - 1 : 0;
      }
      else{
        comment.downvote += 1;
        comment.upvote -= 1 >= 0 ? comment.upvote - 1 : 0;
      } 
      comment.save();
      return { error: false, msg: 'Comment Liked Successfully', data: comment };

    }
    catch(error){
      console.error('Error liking comment:', error);
      return { error: true, msg : error.message, status: 500 };
    }
  }

  

  async getTags(reqData) {
    // console.log("🚀 ~ UserActions ~ getTags ~ reqData:", reqData)
    try {
      const { query } = reqData.query;
      let tags = ["Finance"];
      if (!query || query === "") {
        tags = await Tag.find({}, { name: 1, count: 1 })
          .sort({ count: -1 });
          if(tags.length === 0){
            return { error: true, msg: 'No tags found', status: 404 };
          }
      } else {
        tags = await Tag.find(
          { name: { $regex: query, $options: 'i' } },
          { name: 1, _id: 0 }
        )
        if(tags.length === 0){
          return { error: true, msg: 'No tags found', status: 404 };
        }
      }
      return { error: false, data: tags, status: 200, msg: 'Top 10 relevant Tags fetched successfully' };
    } catch (err) {
      console.error('Error searching tags:', err);
      return {status : 500, msg : 'Failed to search tags' , error : true, details : err.message};
    }
  }

}

module.exports = new UserActions();
