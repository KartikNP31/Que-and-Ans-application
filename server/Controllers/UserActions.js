const Comment = require('../Models/Comment');
const Post = require('../Models/Post')

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
      }
      return { error: false, msg: 'question Submitted Successfully', data: question };
    }
    catch (error) {
      console.log("🚀 ~ UserActions ~ addPost ~ error:", error)
      return { error: true, msg: error.message }
    }
  }


  async getPost(req) {
    try {
      // console.log("🚀 ~ UserActions ~ getPost ~ req:", req.query)
      const { username, approved, content, tags } = req.query;
      const filter = {};
      if (username) filter.username = username;
      if (approved) filter.approved = approved;
      if (content) filter.content = { $regex: content, $options: "i" };
      if (tags) {
        const tagsArray = tags.split(',');
        filter.tags = { $in: tagsArray.map(tag => new RegExp(tag, "i")) };
      }
      const posts = await Post.find(filter);

      if (posts.length === 0) {
        return { error: true, msg: "No posts found matching the criteria.", status: 404 };
      }

      // console.log("🚀 ~ UserActions ~ getPost ~ posts:", posts )
      return { error: false, data: posts, status: 200 };
    } catch (error) {
      console.log("🚀 ~ UserActions ~ getPost ~ error:", error)
      return { error: true, msg: "Internal Server Error.", details: error.message, status: 500 };
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
      const comments = await Comment.find(filter);
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

  async deleteComment(reqData) {
    try {
      const commentId = reqData.commentId;
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

}

module.exports = new UserActions();
