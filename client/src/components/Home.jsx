import React from 'react'
import Posts from './Posts';


const Home = () => {

  return (
    <div className='max-h-[740px] overflow-y-auto custom-scrollbar'>
      <Posts approved={true}/>
    </div>
  );
};

export default Home