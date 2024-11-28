import React from "react";
import { IoAddCircleOutline, IoCheckboxOutline, IoHomeOutline, IoHourglassOutline, IoSearch } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";

const style = "className='w-7 h-7'";
const MenuItems = [
  {name : "Home", element : <IoHomeOutline className="w-7 h-7"/>, link : "/Dashboard/Home"},
  {name : "Search", element : <IoSearch className="w-7 h-7"/>, link : "/Dashboard/SearchPost"},
  {name : "New Post", element : <IoAddCircleOutline className="w-7 h-7"/>, link : "/Dashboard/NewPost"},
  {name : "Approved Post", element : <IoCheckboxOutline className="w-7 h-7"/>, link : "/Dashboard/ApprovedPost"},
  {name : "Pending Post", element : <IoHourglassOutline className="w-7 h-7"/>, link : "/Dashboard/PendingPost"},
]


const Sidebar = () => {

  return (
    <div className="mt-0 w-[110px] h-full py-2 px-1 flex flex-col items-center ">
      <div className="w-full h-full flex flex-col px-1 rounded-lg border border-gray-300">
        {MenuItems.map((item) => (

          <Link to={item.link} className="w-full flex flex-col items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-green-50 hover:text-green-500 ">
            <>{item.element}</>
            
            <span className="text-center text-sm">{item.name}</span>
          </Link>
        ))}


          {/* <div className="w-full flex flex-col items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-green-50 hover:text-green-500 ">
            <IoSearch className="w-7 h-7"/>
            <Link to="/Dashboard/" className="text-center text-sm">Search</Link>
          </div>

          <div className="w-full flex flex-col items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-green-50 hover:text-green-500 ">
            <IoAddCircleOutline className="w-7 h-7"/>
            <Link to="/Dashboard/" className="text-center text-sm">New Post</Link>
          </div>

          <div className="w-full flex flex-col items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-green-50 hover:text-green-500 ">
            <IoCheckboxOutline className="w-7 h-7"/>
            <Link to="" className="text-center text-sm">Approved Post</Link>
          </div>

          <div className="w-full flex flex-col items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-green-50 hover:text-green-500 ">
            <IoHourglassOutline className="w-7 h-7"/>
            <Link className="text-center text-sm">Pending Post</Link>
          </div> */}

      </div>
    </div>
  );
};

export default Sidebar;
