import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import FileComponent from "./FileComponent";


const ModuleComponent = () => {

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
    <div
      className="flex flex-col my-5 bg-white mt-5 px-4 rounded-lg shadow-sm border border-gray-200"
      draggable
    >
      <div className="flex items-center justify-between py-2 ">
        <div
          className="flex items-center space-x-3 w-full"
          onClick={toggleModuleDropDown}
        >
          <button className="text-gray-500 hover:text-gray-700">
            {!isModuleOpen ? (
              <MdOutlineArrowDropDown />
            ) : (
              <MdOutlineArrowDropUp />
            )}
          </button>
          <div>
            <p className="text font-semibold text-gray-900">title</p>
            <p className="text-xs text-gray-500">Add items to this module</p>
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
            <div className="absolute z-10 right-0 mt-2 w-[10vw] bg-white border border-gray-200 rounded-md shadow-lg">
              <div
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <div className="flex flex-row items-center justify-start">
                  <MdOutlineDriveFileRenameOutline className="mr-2" />
                  <h1>Rename</h1>
                </div>
              </div>
              <div
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 border-t border-gray-200"
              >
                <div className="flex flex-row items-center text-red-500 justify-start">
                  <TbTrash className="mr-2" />
                  <h1>Delete</h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModuleOpen && (
        <>
          <FileComponent styleBorder="mt-2"/>
          <FileComponent styleBorder="mt-2"/>
        </>
      )}
      
    </div>
  );
};

export default ModuleComponent;
