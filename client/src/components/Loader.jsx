import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <FaSpinner className="animate-spin text-green-500 text-4xl" />
    </div>
  );
};

export default Loader;
