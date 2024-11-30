const { PUBLIC_SERVER_URL } = require("../api");

const host = PUBLIC_SERVER_URL



class PostServices {
  //fetching Top 10 reviews
  async addPost(reqData) {
    console.log("🚀 ~ PostServices ~ addPost ~ reqData:", reqData)
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
      // console.log("🚀 ~ PostServices ~ getPosts ~ query:", query)
      const response = await fetch(`${host}/api/user/getPosts?${query}`, {
        method: 'GET',
      })
      const res = await response.json();
      // console.log("🚀 ~ PostServices ~ getPosts ~ res:", res)
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async updatePost(reqData) {
    try {
      const response = await fetch(`${host}/api/user/updatePost`, {
        method: 'PATCH',
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
}

module.exports = new PostServices();