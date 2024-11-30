import React, { useEffect, useState } from "react";
import CommentServices from "../services/CommentServices";
import { useUsername } from "../UsernameContextProvider";

const Comments = ({ postId}) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const {username} = useUsername();

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async() => {
    // if (newComment.trim()) {
    //   // onAddComment(newComment);
    //   setNewComment(""); // Reset comment input
    // }
    try{
      const data = {
        content: newComment,
        postId: postId,
        username: username
      }
      const response = await CommentServices.addComment(data);
      console.log("🚀 ~ handleAddComment ~ response:", response.data)
      if(response.error){
        console.log(response.msg);
      }
      setNewComment("");
      setComments([...comments, response.data]);
    }catch(error){
      console.error(error);
    }
  };

  const handleGetComments = async () => {
    try {
      
      const query = {
        postId: postId,
      };
      const response = await CommentServices.getComments(query);
      console.log("🚀 ~ handleGetPosts ~ response:", response.data)
      if(response.error){
        console.log(response.msg);
      }
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetComments();
  }, []);

  return (
    <div className="w-full mt-4 transition-all duration-500 ease-in-out max-h-screen">
      <div className="border-t mt-4 pt-4">
        <div className="flex items-center space-x-2">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Post
          </button>
        </div>
      </div>

      {/* Existing Comments */}
      <div className="mt-4">
        {comments && comments.map((comment, index) => (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {comment.username[0].toUpperCase()}
            </div>
            <div className="flex-grow">
              <p className="font-semibold">{comment.username}</p>
              <p className="text-sm text-gray-600">{comment.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
