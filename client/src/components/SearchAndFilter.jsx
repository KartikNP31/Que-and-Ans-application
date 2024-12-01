import React, { useState } from "react";
import Posts from "./Posts";
import PostStats from "./PostStats";
import Select from "react-select";

const availableTags = [
  { value: "finance", label: "Finance" },
  { value: "investment", label: "Investment" },
  { value: "cryptocurrency", label: "Cryptocurrency" },
  { value: "stocks", label: "Stocks" },
  { value: "economy", label: "Economy" },
];

const SearchAndFilter = ({ setContent, tags, setTags }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [customTag, setCustomTag] = useState("");

  const handleSearch = () => {
    setContent(searchQuery);
  };

  const handleReset = () => {
    setContent("");
    setTags([]);
    setSearchQuery("");
    // setSelectedTag("");
  };

  const handleTagChange = (e) => {
    const selectedTags = e;
    setTags(selectedTags ? selectedTags.map((tag) => tag.value) : []);
  };

  // const handleCustomTagChnage = (e) => {
  //   const cTag = e.target.value;
  //   setCustomTag(cTag);
  // };

  const handleAddCustomTag = () => {
    if (customTag && !tags.includes(customTag)) {
      setTags((prevTags) => [...prevTags, customTag]);
      setCustomTag("");
    }
  };

  const formattedAvailableTags =
    availableTags &&
    availableTags.map((tag) => ({
      value: tag.value,
      label: tag.label,
    }));

  return (
    <>
      <PostStats />
      <div className="flex flex-col items-center w-full p-6 bg-slate-100  rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Search</h2>
        <div className="flex flex-col gap-4 w-full ">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* 
          <div>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select tag</option>
              <option value="Technology">Technology</option>
              <option value="Fitness">Fitness</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
            </select>
          </div> */}

          <div className="flex justify-around">
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 "
            >
              Search
            </button>
          </div>

          <div>
            <h2 className="text-xl text-center font-semibold text-gray-800 mb-4 mt-5">
              Filter
            </h2>
            {/* <label
              htmlFor="tags"
              className="block text-sm font-semibold text-gray-700"
            >
              Tags
            </label> */}
            <Select
              id="tags"
              options={[
                ...formattedAvailableTags,
                ...tags?.map((tag) => ({ value: tag, label: tag })),
              ]}
              isMulti
              onChange={handleTagChange}
              className="mt-2"
              placeholder="Select or add tags"
              value={tags?.map((tag) => ({ value: tag, label: tag }))}
            />
            {/* <div className="mt-2 flex justify-between">
              <input
                type="text"
                value={customTag}
                onChange={handleCustomTagChnage}
                placeholder="Add custom tag"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Add Tag
              </button>
            </div> */}
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 mt-5"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchAndFilter;
