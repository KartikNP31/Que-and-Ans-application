import React, { useEffect, useState } from "react";
import CommentServices from "../services/CommentServices";
import { useUsername } from "../UsernameContextProvider";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { BiDislike, BiLike } from "react-icons/bi";

const Comments = ({ postId }) => {
  console.log("🚀 ~ Comments ~ postId:", postId)
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
      const response = await CommentServices.addComment(data);
      console.log("🚀 ~ handleAddComment ~ response:", response.data);
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
      console.log("🚀 ~ handleGetPosts ~ response:", response.data);
      if (response.error) {
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
    <div className="w-full transition-all duration-500 ease-in-out max-h-screen">
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
            className="bg-green-400 text-white px-4 py-2 rounded-md"
          >
            <IoMdSend />
          </button>
        </div>
      </div>

      <div className="mt-4">
        {comments &&
          comments.map((comment, index) => (
            <div key={index} className="flex justify-between items-start space-x-2 mb-2">
              <div className="flex ">
                <div className="flex items-center justify-center h-full">
                  <p className="w-8 h-8 bg-green-400 text-white rounded-full text-center text-lg font-bold">
                    {comment.username[0].toUpperCase()}
                  </p>
                </div>

                <div className="px-2 flex flex-col justify-between">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-sm">{comment.username}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex-grow">
                    <p className="text ">{comment.content}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                {comment.username === username || userRole === "admin" ? (
                  <div
                    className="flex flex-col justify-center text-gray-500 hover:text-red-500 hover:cursor-pointer"
                    title="Delete"
                  >
                    <AiOutlineDelete className="w-5 h-5" />
                  </div>
                ) : (
                  <></>
                )}

                <div className="flex gap-2">
                  <div className="flex items-center">
                    <BiLike className="text-green-500 w-5 h-5 hover:cursor-pointer" />
                    <p className="m-0">ct</p>
                  </div>

                  <div className="flex items-center">
                    <BiDislike className="text-green-500 w-5 h-5 hover:cursor-pointer" />
                    <p className="m-0">ct</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
