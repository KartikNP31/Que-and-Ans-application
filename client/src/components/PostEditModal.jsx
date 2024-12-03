
import React, { useState } from "react";
import toast from "react-hot-toast";
import PostServices from "../services/PostServices";

const PostEditModal = ({ post, isOpen, onClose, onSave }) => {
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags.join(", ")); // Convert array to comma-separated string

  const handleSave = async () => {
    const updatedPost = {
      ...post,
      content,
      tags: tags.split(",").map((tag) => tag.trim()), 
    };
    onSave(updatedPost);
    const res = await PostServices.updatePost({
      type: "edit",
      _id: post._id,
      updatedPost: updatedPost,
    });


    if (!res.error) {
      toast.success(res.msg);
    } else {
      toast.error(res.msg);
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Post</h2>
        
        {/* Post Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={4}
          placeholder="Edit your post content"
        />

        {/* Post Tags */}
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Edit tags (comma-separated)"
        />

        {/* Modal Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditModal;
