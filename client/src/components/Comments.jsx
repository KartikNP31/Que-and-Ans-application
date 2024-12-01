import React, { useEffect, useState } from "react";
import CommentServices from "../services/CommentServices";
import { useUsername } from "../UsernameContextProvider";
import { IoMdSend } from "react-icons/io";
import toast from "react-hot-toast";
import CommentCard from "./CommentCard";

const Comments = ({ postId }) => {
  // console.log("🚀 ~ Comments ~ postId:", postId)
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const { username, userRole } = useUsername();

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    try {
      const data = {
        content: newComment,
        postId: postId,
        username: username,
      };
      // console.log("🚀 ~ handleAddComment ~ data:", data)
      const response = await CommentServices.addComment(data);
      // console.log("🚀 ~ handleAddComment ~ response:", response.data);
      if (response.error) {
        console.log(response.msg);
      }
      setNewComment("");
      setComments([...comments, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetComments = async () => {
    try {
      const query = {
        postId: postId,
      };
      const response = await CommentServices.getComments(query);
      // console.log("🚀 ~ handleGetPosts ~ response:", response.data);
      if (response.error) {
        console.log(response.msg);
      }
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const response = await CommentServices.deleteComment(id);
      if (response.error) {
        console.log(response.msg);
        toast.error(response.msg);
      }
      setComments(comments.filter((comment) => comment._id !== id));
      toast.success(response.msg);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    handleGetComments();
  }, [comments]);

  return (
    <div className="w-full transition-all duration-500 ease-in-out max-h-screen">
      <div className="border-t mt-1 pt-4">
        <div className="flex items-center space-x-2">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleAddComment}
            className="bg-green-400 text-white px-4 py-2 rounded-md"
          >
            <IoMdSend />
          </button>
        </div>
      </div>

      <div className="mt-4">
        {comments &&
          comments.map((comment, index) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
