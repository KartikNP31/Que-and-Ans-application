import React, { useState } from "react";

const PostStats = () => {

  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  return (
    <div className="flex flex-col justify-between items-center space-y-4 bg-white mb-4">
      <div className="flex-1 w-full text-center mx-3 bg-green-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-green-700">Approved Posts</h2>
        <p className="text-2xl font-bold">{approvedCount}</p>
      </div>

      <div className="flex-1 w-full text-center mx-3 bg-red-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-red-700">Pending Posts</h2>
        <p className="text-2xl font-bold">{pendingCount}</p>
      </div>

    </div>
  );
};

export default PostStats;
