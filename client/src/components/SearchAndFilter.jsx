import React, { useState } from "react";

const SearchAndFilter = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ searchQuery, selectedTag });
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-6 bg-green-50">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Search and Filter Posts
      </h2>
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
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 "
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
