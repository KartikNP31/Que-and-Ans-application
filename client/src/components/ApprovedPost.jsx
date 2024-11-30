import React from 'react'
import Posts from './Posts';

const ApprovedPosts = () => {
  return (
    <div className='max-h-[740px] overflow-y-auto custom-scrollbar'>
      <h1 className="text-3xl font-bold text-center">Approved Posts</h1>
      <Posts approved={true} />
    </div>
  );
}

export default ApprovedPosts