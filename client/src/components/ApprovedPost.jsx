import React from 'react'
import Posts from './Posts';
import { useUser } from "@clerk/clerk-react";

const ApprovedPosts = () => {
  const { user } = useUser();
  const username = user ? user.username : "UnknownUser";

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Approved Posts</h1>
      <Posts approved={true} username={username}/>
    </div>
  );
}

export default ApprovedPosts