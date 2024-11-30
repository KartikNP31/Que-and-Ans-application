const { PUBLIC_SERVER_URL } = require("../api");

const host = PUBLIC_SERVER_URL



class PostServices {
  //fetching Top 10 reviews
  async addPost(reqData) {
    // console.log("🚀 ~ PostServices ~ addPost ~ reqData:", reqData)
    try {
      const response = await fetch(`${host}/api/user/newPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      })
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  
  async getPosts(reqData) {
    try {
      const approved = reqData.approved;
      const data = {
        approved: approved,
      }
      const username = reqData.username;
      if(username!==undefined){
        data.username = username;
      }
      const query = new URLSearchParams(data).toString();
      const response = await fetch(`${host}/api/user/getPosts?${query}`, {
        method: 'GET',
      })
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  async updatePost(reqData){
    try{
      const {type, _id, updatedPost} = reqData;
      
      const updateLikeCount = {
        updateLikes:0
      }
      if(type === 'upVote'){
        updateLikeCount.updateLikes = 1;
      }
      else if(type === 'downVote'){
        updateLikeCount.updateLikes = -1;
      }
      const data = {
        type,
        updateLikeCount,
        postId : _id,
        updatedPost
      };

      // console.log(data);
      

      const res = await fetch(`${host}/api/user/updatePost`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const response = await res.json();
      return response;
    }
    catch (err) {
      console.log(err);
    }
  }

  async deletePost(_id){
    try{
      const res = await fetch(`${host}/api/user/deletePost/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const response = await res.json();
      return response;
    }
    catch (err) {
      console.log(err);
    }
  }

  async approvePost(reqData){
    try{
      const res = await fetch(`${host}/api/user/approvePost`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      })
      const response = await res.json();
      return response;
    }
    catch (err) {
      console.log(err);
    }
  }


}

module.exports = new PostServices();
