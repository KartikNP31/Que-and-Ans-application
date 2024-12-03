const Comment = require('../Models/Comment.js');
const Post = require('../Models/Post.js');
const User = require('../Models/User.js')


class UserAuth {

  async createUser(reqData) {
    try {
      let user = await User.create({
        clerkId: reqData.clerkId,
        email: reqData.email,
        username: reqData.username,
        first_name: reqData.first_name,
        last_name: reqData.last_name,
        image_url: reqData.image_url,
      })
      if (!user) {
        return { error: true, msg: "Internal Server Error, Failed to create user" }
      }
      return { error: false, msg: 'User Created Successfully!' }
    }
    catch (error) {
      return { error: true, msg: error.message };
    }
  }

  async updateUser(reqData) {
    try {
      let email = reqData.email;
      const user = await User.findOne({ email: email });

      if (!user) {
        return { error: true, msg: 'User Not Exist in database' };
      }

      const updated = await User.findByIdAndUpdate(user._id, {
        clerkId: reqData.clerkId,
        username: reqData.username,
        first_name: reqData.first_name,
        last_name: reqData.last_name,
        image_url: reqData.image_url,
      })

      if (!updated) {
        return { error: true, msg: "Internal Server Error, Failed to update user" }
      }
      return { error: false, msg: 'User Updated Successfully!' }
    }
    catch (error) {
      return { error: true, msg: error.message };
    }
  }

  async deleteUser(reqData) {
    try {
      const clerkId = reqData.clerkId;

      const user = await User.findOne({ clerkId });
      if (!user) {
        return { error: true, msg: 'User does not exist in the database' };
      }
      const USERNAME = user.username;
      const postExists = await Post.exists({ username: USERNAME });
      if (postExists) {
        const postUpdateResult = await Post.updateMany(
          { username: USERNAME },
          { $set: { username: 'Unknown User' } }
        );
      }
      const commentExists = await Comment.exists({ username: USERNAME });
      if (commentExists) {
        const commentUpdateResult = await Comment.updateMany(
          { username: USERNAME },
          { $set: { username: 'UnknownUser' } }
        );
      }

      const userid = user._id;
      const deleteUserResult = await User.deleteOne({ _id: userid });

      if (!deleteUserResult.deletedCount) {
        return { error: true, msg: 'Failed to delete user' };
      }

      return {
        error: false,
        msg: 'User deleted successfully!',
      };
    } catch (error) {
      console.error("🚀 ~ UserAuth ~ deleteUser ~ error:", error);
      return { error: true, msg: error.message };
    }
  }

}
module.exports = new UserAuth();