import React, { useState } from "react";
import Posts from "./Posts";
import SearchAndFilter from "./SearchAndFilter";
const PendingPosts = () => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  return (
    <div className="flex justify-between w-full">
      <div className="m-2 p-4 border border-gray-300 rounded-lg w-full">
        <div className="max-h-[740px] overflow-y-auto custom-scrollbar">
          <h1 className="text-3xl font-bold text-center">Pending Posts</h1>
          <Posts approved={false} content={content} tags={tags}/>
        </div>
      </div>
      <div className="m-2 p-4 border border-gray-300 rounded-lg w-[25rem]">
        <SearchAndFilter setContent={setContent} setTags={setTags} tags={tags} />
      </div>
    </div>
  );
};

export default PendingPosts;
