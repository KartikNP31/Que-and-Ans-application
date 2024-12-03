import React, { useState } from "react";
import { useUsername } from "../UsernameContextProvider";
import { AiOutlineDelete } from "react-icons/ai";
import {
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
  BiDownvote,
} from "react-icons/bi";
import CommentServices from "../services/CommentServices";
import toast from "react-hot-toast";

const CommentCard = ({ comment, handleDeleteComment }) => {
  const { username, userRole } = useUsername();
  const [currentComment, setCurrentComment] = useState(comment);
  const [isLiked, setIsLiked] = useState(null);

  const handleLikeComment = async (type, _id) => {
    try {
      if (type === "upVote") {
        setCurrentComment({
          ...currentComment,
          upvote: currentComment.upvote + 1,
          downvote:
            currentComment.downvote - 1 >= 0 ? currentComment.downvote - 1 : 0,
        });
        setIsLiked(true);
      } else {
        setCurrentComment({
          ...currentComment,
          downvote: currentComment.downvote + 1,
          upvote:
            currentComment.upvote - 1 >= 0 ? currentComment.upvote - 1 : 0,
        });
        setIsLiked(false);
      }

      const response = await CommentServices.likeComment({ type, _id });
      if (response.error) {
        console.log(response.msg);
        toast.error(response.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex px-5 mx-4 justify-between items-start space-x-2 mb-2 bg-slate-50 rounded-lg p-2">
      <div className="flex ">
        <div className="flex align-middle justify-center h-full">
          <p className="w-8 h-8 bg-green-400 text-white rounded-full text-center text-lg font-bold">
            {currentComment.username[0].toUpperCase()}
          </p>
        </div>

        <div className="px-4 flex flex-col justify-between">
          <div className="flex items-center space-x-2">
            <p className="font-semibold text-sm">{currentComment.username}</p>
            <p className="text-xs text-gray-400">
              {new Date(currentComment.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex-grow">
            <p className="text ">{currentComment.content}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center h-10 justify-center">
        {currentComment &&
        (currentComment.username === username || userRole === "admin") ? (
          <div
            className="flex flex-col justify-center text-gray-500 hover:text-red-500 hover:cursor-pointer"
            title="Delete"
            onClick={() => handleDeleteComment(currentComment._id)}
          >
            <AiOutlineDelete className="w-5 h-5 fill-red-500" />
          </div>
        ) : (
          <></>
        )}
        <div className="flex gap-2 h-full justify-center align-middle items-center ">
          <div className="flex items-center">
            {isLiked ? (
              <BiSolidUpvote className="text-green-500 w-5 h-5 hover:cursor-pointer" />
            ) : (
              <BiUpvote
                className="text-green-500 w-5 h-5 hover:cursor-pointer"
                onClick={() => {
                  handleLikeComment("upVote", currentComment._id);
                }}
              />
            )}
            <p className={`m-0 text-xs ${isLiked ? "font-semibold" : ""} `}>
              {currentComment.upvote}
            </p>
          </div>
          <div className="flex items-center ">
            {isLiked != null && !isLiked ? (
              <BiSolidDownvote className="text-green-500 w-5 h-5 hover:cursor-pointer" />
            ) : (
              <BiDownvote
                className="text-green-500 w-5 h-5 hover:cursor-pointer"
                onClick={() => {
                  handleLikeComment("downVote", currentComment._id);
                }}
              />
            )}
            <p className={`m-0 text-xs ${!isLiked ? "font-semibold" : ""} `}>
              {currentComment.downvote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
