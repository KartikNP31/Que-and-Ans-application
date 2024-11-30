import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";

import Authentication from "./components/Authentication";
import WelcomePage from "./components/WelcomePage";
import LandingPage from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import Home from "./components/Home";
import ApprovedPost from "./components/ApprovedPost";
import PendingPost from "./components/PendingPost";
import NewPost from "./components/NewPost";
import SearchPost from "./components/SearchPost";
import { useUsername } from "./UsernameContextProvider";

function App() {

  const { user } = useUser();
  const {setUsername} = useUsername();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user, setUsername]);
  

  return (
    <div className="h-screen w-full block ">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={< LandingPage />} replace>
            <Route path='/' element={<Navigate to="/WelcomePage"/> } />
            <Route path='/WelcomePage' element={<WelcomePage />} />
            <Route path='/Authentication' element={<Authentication />} />
            <Route path="/Dashboard" element={< Dashboard />} replace>
              <Route path='/Dashboard' element={<Navigate to="/Dashboard/Home"/>} />
              <Route path='/Dashboard/Home' element={<Home />} />
              <Route path='/Dashboard/ApprovedPost' element={<ApprovedPost />} />
              <Route path='/Dashboard/PendingPost' element={<PendingPost />} />
              <Route path='/Dashboard/NewPost' element={<NewPost />} />
              <Route path='/Dashboard/SearchPost' element={<SearchPost />} />
            </Route>
          </Route>
          <Route path='*' element={<Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
