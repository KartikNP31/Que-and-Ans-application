import React, { useEffect } from 'react'
import Posts from './Posts';
import { useUsername } from '../UsernameContextProvider';

const ApprovedPosts = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Approved Posts</h1>
      <Posts approved={true} />
    </div>
  );
}

export default ApprovedPosts