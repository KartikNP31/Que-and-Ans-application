const Comment = require('../Models/Comment.js');
const Post = require('../Models/Post.js');
const User=require('../Models/User.js')


class UserAuth{

    async createUser(reqData){
      try{
          // console.log("🚀 ~ UserServices ~ createUser ~ reqData:", reqData)
            let user = await User.create({
              clerkId: reqData.clerkId, // Clerk's unique user ID
              email: reqData.email,
              username: reqData.username,
              first_name: reqData.first_name,
              last_name: reqData.last_name,
              image_url: reqData.image_url,
            })
            if(!user){
              // console.log("🚀 ~ UserServices ~ createUser ~ user:", user)
              return {error:true, msg:"Internal Server Error, Failed to create user"}
            }
            // console.log("🚀 ~ UserServices ~ createUser ~ User Created Successfully!:")
            return {error:false, msg:'User Created Successfully!'}
        }
        catch(error){
            // console.log("🚀 ~ UserServices ~ createUser ~ error:", error)
            return {error:true, msg:error.message};
        }
    }

    async updateUser(reqData){
      try{
        // console.log("🚀 ~ UserServices ~ updateUser ~ reqData:", reqData)
            let email = reqData.email;
            const user = await User.findOne({email : email});

            if(!user){
              return {error:true, msg:'User Not Exist in database'};
            }

            const updated = await User.findByIdAndUpdate(user._id, {
              clerkId : reqData.clerkId,
              username: reqData.username,
              first_name: reqData.first_name,
              last_name: reqData.last_name,
              image_url: reqData.image_url,
            })

            // console.log("🚀 ~ UserServices ~ deleteUser ~ user:", updated)
            if(!updated){
              return {error:true, msg:"Internal Server Error, Failed to update user"}
            }
            // console.log("🚀 ~ UserServices ~ updateUser ~ User Updated Successfully!:")
            return {error:false, msg:'User Updated Successfully!'}
        }
        catch(error){
            // console.log("🚀 ~ UserServices ~ updateUser ~ error:", error)
            return {error:true, msg:error.message};
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
        // console.log("🚀 ~ UserAuth ~ deleteUser ~ USERNAME:", USERNAME);
    
        // Update posts only if they exist
        const postExists = await Post.exists({ username: USERNAME });
        if (postExists) {
          const postUpdateResult = await Post.updateMany(
            { username: USERNAME },
            { $set: { username: 'Unknown User' } }
          );
          // console.log("🚀 ~ UserAuth ~ deleteUser ~ Post updates:", postUpdateResult.modifiedCount);
        }
    
        // Update comments only if they exist
        const commentExists = await Comment.exists({ username: USERNAME });
        if (commentExists) {
          const commentUpdateResult = await Comment.updateMany(
            { username: USERNAME },
            { $set: { username: 'UnknownUser' } }
          );
          // console.log("🚀 ~ UserAuth ~ deleteUser ~ Comment updates:", commentUpdateResult.modifiedCount);
        }
    
        // Delete the user
        const userid = user._id;
        // console.log("🚀 ~ UserAuth ~ deleteUser ~ userid:", userid);
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
    
    // async getUser



}
module.exports=new UserAuth();