import React, { useEffect, useState } from "react";
import Select from "react-select";
import PostServices from "../services/PostServices";

const demo = [
  { name: "Finance" },
  { name: "Investment" },
  { name: "Cryptocurrency" },
  { name: "Stocks" },
  { name: "Economy" },
];

const SearchAndFilter = ({ setContent, tags, setTags }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [availableTags, setAvailableTags] = useState(demo);

  const handleSearch = () => {
    setContent(searchQuery);
  };

  const handleReset = () => {
    setContent("");
    setTags([]);
    setSearchQuery("");
  };

  const handleGetTags = async () => {
    try {
      const response = await PostServices.getTags({query: ""});
      console.log("🚀 ~ handleGetTags ~ response:", response)
      if (response.error) {
        console.log("Error getting tags:", response.msg);
        return;
      }
      setAvailableTags(response.data.length > 0 ? response.data : demo);
    } catch (error) {
      console.error("Error getting tags:", error);
    }
  };

  const handleTagChange = (e) => {
    const selectedTags = e;
    setTags(selectedTags ? selectedTags.map((tag) => tag.value) : []);
  };

  const formattedAvailableTags =
    availableTags &&
    availableTags.map((tag) => ({
      value: tag.name,
      label: tag.name,
    }));

    useEffect(() => {
      handleGetTags();
    }, []);
    
  return (
    <>
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
