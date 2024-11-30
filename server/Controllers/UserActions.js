const Comment = require('../Models/Comment');
const Post = require('../Models/Post')

class UserActions {
  async addPost(reqData) {
    try {
      console.log("🚀 ~ UserActions ~ addPost ~ reqData:", reqData)
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
      return { error: false, msg: 'question Submitted Successfully', data: question};
    }
    catch (error) {
      return { error: true, msg: error.message }
    }
  }

  
  async getPost(req) {
    try {
      console.log("🚀 ~ UserActions ~ getPost ~ req:", req.query)
      const { username, approved, content, tags} = req.query;
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
      return { error: true, msg: "Internal Server Error.", details: error.message , status: 500};
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
      return { error: false, msg: 'comment Submitted Successfully', data: comment};
    }
    catch (error) {
      return { error: true, msg: error.message }
    }
  }

  
  async getComments(req) {
    try {
      const { username, postId} = req.query;
      const filter = {};
      if (username) filter.username = username;
      if (postId) filter.postId = postId;
      const comments = await Comment.find(filter);

      if (comments.length === 0) {
        return { error: true, msg: "No comments found matching the criteria.", status: 404 };
      }
      return { error: false, data: comments, status: 200 };
    } catch (error) {
      return { error: true, msg: "Internal Server Error.", details: error.message , status: 500};
    }
  }


  async deletePost(reqData) {
    try {
      const postId = reqData.postId;
      const commentExists = await Comment.exists({ postId: postId });
        if (commentExists) {
          const commentDeleteResult = await Comment.deleteMany({ postId: postId });
          console.log("🚀 ~ UserActions ~ deletePost ~ Comment deleted:", commentDeleteResult.deletedCount);
        }
      const post = await Post.findByIdAndDelete(postId);
      if (!post) {
        return { error: true, msg: 'Internal Server Error' };
      }
      return { error: false, msg: 'Post Deleted Successfully', data: post};
    }
    catch (error) {
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
      return { error: false, msg: 'Comment Deleted Successfully', data: comment};
    }catch (error) {
      return { error: true, msg: error.message }
    }
  }

}

module.exports = new UserActions();