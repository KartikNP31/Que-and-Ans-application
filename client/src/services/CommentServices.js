const { PUBLIC_SERVER_URL } = require("../api");

const host = PUBLIC_SERVER_URL



class CommentServices {
  //fetching Top 10 reviews
  async addPost(reqData) {
    console.log("🚀 ~ CommentServices ~ addPost ~ reqData:", reqData)
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
}

module.exports = new CommentServices();