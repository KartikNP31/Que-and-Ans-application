import React from 'react'
import Posts from './Posts';
import { useUser } from "@clerk/clerk-react";


const Home = () => {

  return (
    <Posts approved={true} username="UnknownUser"/>
  );
};

export default Home