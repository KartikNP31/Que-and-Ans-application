import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export const Dashboard = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isSignedIn) {
      navigate("/WelcomePage");
    }
  }, [isSignedIn, navigate]);
  return (
    <div className="flex h-[800px]">
      <Sidebar />
      <Outlet />
    </div>
  );
};
