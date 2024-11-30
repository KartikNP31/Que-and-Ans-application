import React from 'react'
import Posts from './Posts';
import { useUsername } from '../UsernameContextProvider';

const ApprovedPosts = () => {
  const {username, userRole, setUsername} = useUsername();
  if(userRole === "admin"){
    setUsername(undefined);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Approved Posts</h1>
      <Posts approved={true} username={username}/>
    </div>
  );
}

export default ApprovedPosts