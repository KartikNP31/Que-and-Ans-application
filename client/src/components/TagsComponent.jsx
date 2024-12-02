import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { useUsername } from "../UsernameContextProvider";

const TagsComponent = ({ post, handleEdit, handleDelete }) => {
  const { username } = useUsername();
  const { userRole } = useUsername();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="flex flex-col bg-white px-4 rounded-lg my-2">
      <div className=" flex items-center justify-between pt-2 ">
        <div className="flex items-center space-x-3">
          <div className="text-sm font-medium text-gray-900">
            {post.tags.length > 0 &&
              post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-500 text-white text-sm font-medium px-2 py-0 rounded-sm mr-1 mb-1"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
        <div
          className="relative w-[3vw] hover:cursor-pointer"
          ref={dropdownRef}
          onClick={toggleDropdown}
        >
          {post.username === username || userRole === "admin" ? (
            <button className="text-gray-400 hover:text-gray-600">
              <BsThreeDotsVertical color="black" className="ml-4" />
            </button>
          ) : (
            <></>
          )}

          {isOpen && (post.username === username || userRole === "admin") && (
            <div className="absolute z-10 right-0 mt-2 w-[15vw] bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="py-1">
                {username === post.username && (
                  <div
                    onClick={handleEdit}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex flex-row items-center justify-start">
                      <MdOutlineDriveFileRenameOutline className="mr-2" />
                      <h1>Edit</h1>
                    </div>
                  </div>
                )}

                {(username === post.username || userRole === "admin") && (
                  <div
                    onClick={handleDelete}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                  >
                    <div className="flex flex-row items-center text-red-500 justify-start">
                      <TbTrash className="mr-2" />
                      <h1>Delete</h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagsComponent;
