import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import PostServices from "../services/PostServices";
import { useUsername } from "../UsernameContextProvider";
import { useLocation } from "react-router-dom";

const Posts = ({ approved, content, tags }) => {
  const [posts, setPosts] = useState([]);
  const { username, userRole } = useUsername();
  const location = useLocation();

  const handleGetPosts = async () => {
    try {

      const query = {
        approved: approved,
        content: content,
        tags: tags,
      };
      if (
        location.pathname === "/Dashboard/PendingPost" ||
        location.pathname === "/Dashboard/ApprovedPost"
      ) {
        if (userRole !== "admin") {
          query.username = username;
        }
      }

      const response = await PostServices.getPosts(query);
      // console.log("🚀 ~ handleGetPosts ~ response:", response);
      if (response.error) {
        console.log(response.msg);
        console.log(posts.length);
      } else {
        setPosts(response.data);
      }
      // console.log("🚀 ~ handleGetPosts ~ posts:", posts.length);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFromArray = (id) => {
    const newArray = posts.filter((post) => post._id !== id);
    setPosts(newArray);
  };

  useEffect(() => {
    handleGetPosts();
  }, [username, approved, content, tags]);

  return (
    <div className="container mx-auto p-6">
      {posts.map((post, index) => (
        <PostCard
          key={post._id ? post._id : index}
          post={post}
          handleDeleteFromArray={handleDeleteFromArray}
        />
      ))}
    </div>
  );
};

export default Posts;
