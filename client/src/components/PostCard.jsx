// PostCard.js

import React, { useState } from "react";
import { AiOutlineLike, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Comments from "./Comments";

const PostCard = ({ post }) => {
  const { question, tags, username, createdAt } = post;
  
  // State for managing comment section visibility
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const handleLike = () => {
    console.log("Liked the post!");
  };

  const handleComment = () => {
    setIsCommentOpen(!isCommentOpen); // Toggle comment section visibility
  };

  const handleEdit = () => {
    console.log("Editing the post!");
  };

  const handleDelete = () => {
    console.log("Deleting the post!");
  };

  // const handleAddComment = (newComment) => {
  //   const newCommentData = {
  //     username,
  //     content: newComment,
  //     createdAt: new Date(),
  //   };
  //   setComments([...comments, newCommentData]); // Add new comment to state
  // };

  return (
    <div className="flex flex-col items-start p-4 mb-4 bg-white shadow-md rounded-lg">
      {/* Left Section: User Info */}
      <div className="flex-shrink-0 mr-4">
        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
          {username[0].toUpperCase()}
        </div>
      </div>

      {/* Right Section: Post Content */}
      <div className="flex-grow w-full">
        {/* Question */}
        <h2 className="text-lg font-bold text-gray-800">{question}</h2>

        {/* Tags */}
        <div className="mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-800 text-sm font-medium px-2 py-1 rounded mr-2"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: Username and Date */}
        <div className="mt-3 text-sm text-gray-500">
          Posted by <span className="font-semibold">{username}</span> on{" "}
          {new Date(createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={handleLike}
          className="text-gray-500 hover:text-blue-500"
          title="Like"
        >
          <AiOutlineLike size={24} />
        </button>
        <button
          onClick={handleComment}
          className="text-gray-500 hover:text-green-500"
          title="Comment"
        >
          <FaRegComment size={24} />
        </button>
        <button
          onClick={handleEdit}
          className="text-gray-500 hover:text-yellow-500"
          title="Edit"
        >
          <AiOutlineEdit size={24} />
        </button>
        <button
          onClick={handleDelete}
          className="text-gray-500 hover:text-red-500"
          title="Delete"
        >
          <AiOutlineDelete size={24} />
        </button>
      </div>

      {/* Conditionally render CommentSection */}
      {isCommentOpen && (
        <Comments
          postId={post._id}
          username={post.username}
          // onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default PostCard;
