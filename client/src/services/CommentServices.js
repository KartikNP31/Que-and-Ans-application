const { PUBLIC_SERVER_URL } = require("../api");

const host = PUBLIC_SERVER_URL



class CommentServices {

  async addComment(reqData) {
    try {
      const response = await fetch(`${host}/api/user/newComment`, {
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
  
  async getComments(reqData) {
    try {
      const query = new URLSearchParams(reqData).toString();
      const response = await fetch(`${host}/api/user/getComments?${query}`, {
        method: 'GET',
      })
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  }


  async deleteComment(id) {
    try {
      const response = await fetch(`${host}/api/user/deleteComment/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async likeComment(reqData){
    try{
      const response = await fetch(`${host}/api/user/likeComment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(reqData),
      })
      const res = await response.json();
      return res;
    }
    catch(err){
      console.log(err);
    }
  };


}

module.exports = new CommentServices();