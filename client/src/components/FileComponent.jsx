import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegFileImage, FaRegFilePdf } from "react-icons/fa";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineFileDownload,
} from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import { LuLink } from "react-icons/lu";

const FileComponent = ({ styleBorder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isFileRename, setFileRename] = useState(false);
  const [isFileDelete, setFileDelete] = useState(false);
  const [isLinkEdit, setLinkEdit] = useState(false);

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

  const handleFileRename = () => {
    setFileRename(!isFileRename);
    setIsOpen(false);
  };

  const handleFileDelete = () => {
    setFileDelete(!isFileDelete);
    setIsOpen(false);
  };

  const handleLinkEdit = () => {
    setLinkEdit(!isLinkEdit);
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <div
      className={`flex flex-col bg-white px-4 rounded-lg shadow-sm ${styleBorder}`}
      draggable
    >
      <div className=" flex items-center justify-between py-2 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-md">
            <FaRegFilePdf color="red" />
          </div>

          <div>
            <div className="text-sm font-medium text-gray-900">title</div>

            <p className="text-xs text-gray-500">type</p>
          </div>
        </div>
        <div
          className="relative w-[3vw] hover:cursor-pointer"
          ref={dropdownRef}
          onClick={toggleDropdown}
        >
          <button className="text-gray-400 hover:text-gray-600">
            <BsThreeDotsVertical color="black" className="ml-4" />
          </button>
          {isOpen && (
            <div className="absolute z-10 right-0 mt-2 w-[15vw] bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="py-1">
                <div
                  onClick={handleLinkEdit}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex flex-row items-center justify-start">
                    <MdOutlineDriveFileRenameOutline className="mr-2" />
                    <h1>Edit</h1>
                  </div>
                </div>

                <div
                  onClick={handleFileDelete}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                >
                  <div className="flex flex-row items-center text-red-500 justify-start">
                    <TbTrash className="mr-2" />
                    <h1>Delete</h1>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileComponent;
