import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import PostServices from "../services/PostServices";
import { useUsername } from "../UsernameContextProvider";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";

const Posts = ({ approved, content, tags }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const { username, userRole } = useUsername();
  const location = useLocation();

  const handleGetPosts = async () => {
    try {
      // setTimeout(() => {
      //   <Loader />;
      // }, 5000);

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

      const response = await PostServices.getPosts({
        reqData: query,
        page,
        limit,
      });
      // console.log("🚀 ~ handleGetPosts ~ response:", response);
      if (response.error) {
        console.log(response.msg);
        console.log(posts.length);
      } else {
        setPosts(posts.concat(response.data));
        setPage(page + 1);
        setTotalResults(response.totalResults);
      }
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
      {posts && (
        <InfiniteScroll
          dataLength={posts.length}
          next={handleGetPosts}
          hasMore={posts.length !== parseInt(totalResults)}
          loader={<Loader />}
          height={650}
          className="custom-scrollbar"
        >
          {posts.map((post, index) => (
            <PostCard
              key={post._id ? post._id : index}
              post={post}
              handleDeleteFromArray={handleDeleteFromArray}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Posts;
