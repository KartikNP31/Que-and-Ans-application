import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import PostServices from '../services/PostServices';

const Posts = ({approved, username}) => {
  // console.log("🚀 ~ Posts ~ username:", username)
  const [posts, setPosts] = useState([]);
  

  const handleGetPosts = async () => {
    try {
      const query = {
        approved: approved,
      }
      if(username!=="UnknownUser"){
        query.username = username;
      }
      const response = await PostServices.getPosts(query);
      // console.log("🚀 ~ handleGetPosts ~ response:", response)
      if(response.error){
        console.log(response.msg);
      }
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {posts && posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
};

export default Posts