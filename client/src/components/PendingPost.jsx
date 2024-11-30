import React from 'react'
import Posts from './Posts';
import { useUsername } from '../UsernameContextProvider';
const PendingPosts = () => {
  const {username} = useUsername();




  return (
    <div className='max-h-[610px] overflow-y-auto custom-scrollbar'>
      <h1 className="text-3xl font-bold text-center">Pending Posts</h1>
      <Posts approved={false} username={username}/>
    </div>
  );
}

export default PendingPosts