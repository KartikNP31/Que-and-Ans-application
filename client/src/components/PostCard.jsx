
import React, { useEffect, useRef, useState } from "react";
import Comments from "./Comments";
import { BiLike, BiSolidLike } from "react-icons/bi";
import TagsComponent from "./TagsComponent";
import PostEditModal from "./PostEditModal";
import {useLocation} from 'react-router-dom'
import PostServices from "../services/PostServices";
import toast from "react-hot-toast";


const PostCard = ({ post , handleDeleteFromArray}) => {
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

  const handleLike = async(num) => {    
    if(num == 1){
      const res = await PostServices.updatePost({type: "upVote", _id: post._id, updatedPost: null});
      setCurrentPost({
        ...currentPost,
        likes: currentPost.likes + 1,
      })
    }
    else if(num == -1){
      const res = await PostServices.updatePost({type: "downVote", _id: post._id, updatedPost: null});
      setCurrentPost({
        ...currentPost,
        likes: currentPost.likes - 1,
      })
    }
    setIsLiked(!isLiked);
  };



  const handleEdit = () => {
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleDelete = async() => {
    const res = await PostServices.deletePost(post._id);
    if(!res.error){
      handleDeleteFromArray(post._id);
      toast.success(res.msg);
    }
    else{
      toast.error(res.msg)
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
    <div className="flex flex-col my-5 bg-white mt-5 px-4 rounded-lg shadow-sm border border-gray-200 hover:cursor-pointer">
      <div className="flex items-center justify-between py-2 ">
        <div
          className="flex items-center space-x-3 w-full"
          onClick={toggleModuleDropDown}
        >
          <div className="w-10 h-10 bg-green-400 text-white rounded-full  flex items-center justify-center font-bold text-xl">
            {currentPost.username[0].toUpperCase()}
          </div>
          <div>
            <p className="text font-semibold text-gray-900">
              {currentPost.content}
            </p>
            <p className="text-xs text-gray-500">
              <p className="font-sm text-gray-500">
                by- <span className="text-gray-800">{currentPost.username}</span> on{" "}
                {new Date(currentPost.createdAt).toLocaleDateString()}
              </p>
            </p>
          </div>
        </div>
        <div
          className="relative w-[3vw] hover:cursor-pointer justify-center"
          ref={dropdownRef}
          onClick={toggleDropdown}
        >
          {
            isLiked ? (
              <BiSolidLike className="text-green-500 w-6 h-6" onClick={()=>{handleLike(-1)}}/>
            ) : (
              <BiLike className="text-green-500 w-6 h-6" onClick={()=>{handleLike(1)}}/>
            )
          }
          {currentPost.likes}
        </div>
      </div>

      {isModuleOpen &&  (
        <>
          <TagsComponent post={currentPost} handleEdit = {handleEdit} handleDelete={handleDelete}/>
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
