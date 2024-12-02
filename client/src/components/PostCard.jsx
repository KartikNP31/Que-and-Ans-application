import React, { useEffect, useRef, useState } from "react";
import Comments from "./Comments";
import { BiLike, BiSolidLike } from "react-icons/bi";
import TagsComponent from "./TagsComponent";
import PostEditModal from "./PostEditModal";
import { useLocation } from "react-router-dom";
import PostServices from "../services/PostServices";
import toast from "react-hot-toast";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { useUsername } from "../UsernameContextProvider";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { BsClockFill } from "react-icons/bs";

const PostCard = ({ post, handleDeleteFromArray }) => {
  const { userRole } = useUsername();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(post);
  const [isLiked, setIsLiked] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleModuleDropDown = () => {
    setIsModuleOpen(!isModuleOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLike = async (num) => {
    if (num === 1) {
      const res = await PostServices.updatePost({
        type: "upVote",
        _id: post._id,
        updatedPost: null,
      });
      if(res.error){
        toast.error(res.msg);
        return;
      }
      setCurrentPost({
        ...currentPost,
        likes: currentPost.likes + 1,
      });
    } else if (num === -1) {
      const res = await PostServices.updatePost({
        type: "downVote",
        _id: post._id,
        updatedPost: null,
      });
      if(res.error){
        toast.error(res.msg);
        return;
      }
      setCurrentPost({
        ...currentPost,
        likes: currentPost.likes - 1,
      });
    }
    setIsLiked(!isLiked);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleDelete = async () => {
    const res = await PostServices.deletePost(post._id);
    if (!res.error) {
      handleDeleteFromArray(post._id);
      toast.success(res.msg);
    } else {
      toast.error(res.msg);
    }
  };

  const handleApprove = async (value) => {
    try {
      const response = await PostServices.approvePost({
        postId: post._id,
        approved: value,
      });
      if (response.error) {
        toast.error(response.msg);
      } else {
        toast.success(response.msg);
        handleDeleteFromArray(post._id);
      }
    } catch (error) {
      console.log("🚀 ~ handleApprove ~ error:", error);
    }
  };

  const handleEditPost = (updatedPost) => {
    setCurrentPost(updatedPost); // Update the post data
    setIsEditModalOpen(false); // Close the modal
    console.log("Post updated:", updatedPost);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className="postCardContainer flex flex-col my-5 bg-white mt-5 px-4 rounded-lg shadow-sm border border-gray-200 hover:cursor-pointer">
      <div className="flex items-center justify-between py-2 ">
        <div
          className="flex items-center space-x-3 w-full"
          onClick={toggleModuleDropDown}
        >
          <div className="w-10 h-10 bg-green-400 text-white rounded-full  flex items-center justify-center font-bold text-xl">
            {currentPost.username[0].toUpperCase()}
          </div>
          <div className="w-full">
            <p className="text font-semibold text-gray-900">
              {currentPost.content}
            </p>
            <div className="text-xs flex gap-3 text-gray-500">
              <p className="font-sm text-gray-500">
                by-{" "}
                <span className="text-gray-800">{currentPost.username}</span> on{" "}
                {new Date(currentPost.createdAt).toLocaleDateString()}
              </p>
              {post.approved ? (
                <p className="font-sm flex text-green-600">
                  <IoMdCheckmarkCircle className="h-4 w-4 items-center" />
                  <span>Approved</span>
                </p>
              ) : (
                <p className="font-sm flex text-red-500">
                  <BsClockFill className="h-4 w-4 mr-1 items-center" />
                  <span>Pending</span>
                </p>
              )}
            </div>
          </div>
        </div>
        {(location.pathname === "/Dashboard/Home" ||
          (location.pathname === "/Dashboard/ApprovedPost" &&
            userRole !== "admin")) && (
          <div
            className="relative w-[3vw] hover:cursor-pointer justify-center flex gap-1"
            ref={dropdownRef}
            onClick={toggleDropdown}
          >
            {isLiked ? (
              <BiSolidLike
                className="text-green-500 w-6 h-6"
                onClick={() => {
                  handleLike(-1);
                }}
              />
            ) : (
              <BiLike
                className="text-green-500 w-6 h-6"
                onClick={() => {
                  handleLike(1);
                }}
              />
            )}
            <p>{currentPost.likes}</p>
          </div>
        )}

        {userRole === "admin" && location.pathname !== "/Dashboard/Home" && (
          <div
            className="relative mr-2 hover:cursor-pointer justify-center"
            ref={dropdownRef}
            onClick={toggleDropdown}
          >
            {location.pathname === "/Dashboard/PendingPost" && (
              <div className="flex gap-2">

                <button
                  value="true"
                  onClick={() => handleApprove(true)}
                  className="bg-green-300 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDelete()}
                  className="bg-red-300 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        )}
        <div>
          {isModuleOpen ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />}
        </div>
      </div>

      {isModuleOpen && (
        <>
          <TagsComponent
            post={currentPost}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          {post.approved ? <Comments postId={post._id} /> : <> </>}
        </>
      )}

      <PostEditModal
        post={currentPost}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditPost}
      />
    </div>
  );
};

export default PostCard;
