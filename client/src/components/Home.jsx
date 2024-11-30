import React from 'react'
import Posts from './Posts';
import { useUser } from "@clerk/clerk-react";


const Home = ({username}) => {

  return (
    <Posts approved={true} username={undefined}/>
  );
};

export default Home