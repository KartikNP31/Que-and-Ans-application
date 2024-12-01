import React, { useEffect, useState } from "react";
import Select from "react-select";
import PostServices from "../services/PostServices";
import { toast } from 'react-hot-toast';
import { useUsername } from "../UsernameContextProvider";

// Sample predefined tags for demonstration purposes
const availableTags = [
  { value: "finance", label: "Finance" },
  { value: "investment", label: "Investment" },
  { value: "cryptocurrency", label: "Cryptocurrency" },
  { value: "stocks", label: "Stocks" },
  { value: "economy", label: "Economy" },
];

const NewPost = () => {
  const {username} = useUsername();
  const [question, setQuestion] = useState("");
  const [tags, setTags] = useState([]);
  const [customTag, setCustomTag] = useState("");

  const handleQuestionChange = (e) => {
    const que = e.target.value;
    setQuestion(que);
  };

  const handleTagChange = (e) => {
    const selectedTags = e;
    setTags(selectedTags ? selectedTags.map((tag) => tag.value) : []);
  };

  const handleCustomTagChnage = (e) => {
    const cTag = e.target.value;
    setCustomTag(cTag);
  };

  const handleAddCustomTag = () => {
    if (customTag && !tags.includes(customTag)) {
      setTags((prevTags) => [...prevTags, customTag]);
      setCustomTag("");
    }
  };

  const formattedAvailableTags = availableTags.map((tag) => ({
    value: tag.value,
    label: tag.label,
  }));
  
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if(tags.length === 0) {
      toast.error("Please select or add at least one tag");
      return;
    }
    const data = {
      question: question,
      tags: tags,
      username: username,
    };

    // console.log("🚀 ~ handlePostSubmit ~ data:", data)
    try {
      const res = await PostServices.addPost(data);
      if (res.error) {
        toast.error(res.msg);
      } else {
        toast.success(res.msg);
      }
        console.log("🚀 ~ handlePostSubmit ~ res.msg:", res.msg)
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    setQuestion("");
    setTags([]);
  };


  return (
    <div className="container mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create a New Post</h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="question"
            className="block text-sm font-semibold text-gray-700"
          >
            Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={handleQuestionChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            placeholder="Ask a question related to finance..."
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-semibold text-gray-700"
          >
            Tags
          </label>
          <Select
            id="tags"
            options={[
              ...formattedAvailableTags,
              ...tags.map((tag) => ({ value: tag, label: tag })),
            ]}
            isMulti
            onChange={handleTagChange}
            className="mt-2"
            placeholder="Select or add tags"
            value={tags.map((tag) => ({ value: tag, label: tag }))}
          />
          <div className="mt-2">
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
          </div>
        </div>

        <button
          type="button"
          onClick={handlePostSubmit}
          className="w-full bg-blue-500 text-white p-3 rounded-md mt-4 hover:bg-blue-600"
        >
          Post Question
        </button>
      </div>
    </div>
  );
};

export default NewPost;