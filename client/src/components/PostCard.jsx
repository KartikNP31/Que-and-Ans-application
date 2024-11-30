import React, { useEffect, useRef, useState } from "react";
import Comments from "./Comments";
import { BiLike, BiSolidLike } from "react-icons/bi";
import TagsComponent from "./TagsComponent";

const PostCard = ({ post }) => {
  console.log("🚀 ~ PostCard ~ post:", post)
  const [isOpen, setIsOpen] = useState(false);
  const [isModuleOpen, setIsModuleOpen] = useState(false);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className="flex flex-col my-5 bg-white mt-5 px-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between py-2 ">
        <div
          className="flex items-center space-x-3 w-full"
          onClick={toggleModuleDropDown}
        >
          <div className="w-10 h-10 bg-green-400 text-white rounded-full  flex items-center justify-center font-bold text-xl">
            {post.username[0].toUpperCase()}
          </div>
          <div>
            <p className="text font-semibold text-gray-900">
              {post.content.endsWith("?") ? post.content : post.content + " ?"}
            </p>
            <p className="text-xs text-gray-500">
              <p className="font-sm text-gray-500">
                by- <span className="text-gray-800">{post.username}</span> on{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </p>
          </div>
        </div>
        <div
          className="relative w-[3vw] hover:cursor-pointer justify-center"
          ref={dropdownRef}
          onClick={toggleDropdown}
        >
          <BiLike className="text-green-500 w-6 h-6" />
          <BiSolidLike className="text-green-500 w-6 h-6" />
        </div>
      </div>

      {isModuleOpen && (
        <>
          <TagsComponent post={post} />
          <Comments postId={post._id} />
        </>
      )}
    </div>
  );
};

export default PostCard;
