import React from 'react'
import Posts from './Posts';
const PendingPosts = () => {

  return (
    <div className='max-h-[740px] overflow-y-auto custom-scrollbar'>
      <h1 className="text-3xl font-bold text-center">Pending Posts</h1>
      <Posts approved={false} />
    </div>
  );
}

export default PendingPosts