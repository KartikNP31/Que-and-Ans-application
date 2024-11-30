import React, { useState } from "react";
import { IoAddCircleOutline, IoCheckboxOutline, IoHomeOutline, IoHourglassOutline, IoSearch } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";

const style = "className='w-7 h-7'";
const MenuItems = [
  {name : "Home", element : <IoHomeOutline className="w-7 h-7" id="1"/>, link : "/Dashboard/Home", active : true, id : "1"},
  {name : "New Post", element : <IoAddCircleOutline className="w-7 h-7" id="2"/>, link : "/Dashboard/NewPost", active : false, id : "2"},
  {name : "Approved Post", element : <IoCheckboxOutline className="w-7 h-7" id="3"/>, link : "/Dashboard/ApprovedPost", active : false, id : "3"},
  {name : "Pending Post", element : <IoHourglassOutline className="w-7 h-7" id="4"/>, link : "/Dashboard/PendingPost", active : false, id : "4"},
  {name : "Search", element : <IoSearch className="w-7 h-7" id="5"/>, link : "/Dashboard/SearchPost",  active : false, id : "5"},
]


const Sidebar = () => {
  const [menu, setMenu] = useState(MenuItems);
  
  const handleClick = (e) => {  
    const id = e.target.id;
    console.log("🚀 ~ handleClick ~ id:", id)
    const newMenu = menu.map((item) => {
      if(item.id === id){
        item.active = true;
      } else {
        item.active = false;
      }
      return item
    });
    setMenu(newMenu);
    console.log("🚀 ~ Sidebar ~ menu:", menu)
  }

  return (
    <div className="mt-0 w-[110px] h-full py-2 px-1 flex flex-col items-center ">
      <div className="w-full h-full flex flex-col px-1 rounded-lg border border-gray-300">
        {menu.map((item) => (

          <Link id={item.id} to={item.link} className={`w-full flex flex-col items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-green-50 hover:text-green-500 ${item.active ? "bg-green-50 text-green-500" : ""}`} onClick={handleClick}>
            <div id={item.id}>{item.element}</div>
            
            <span id={item.id} className="text-center text-sm">{item.name}</span>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default Sidebar;
