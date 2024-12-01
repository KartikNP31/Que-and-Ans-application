import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import SearchAndFilter from "./SearchAndFilter";
import { useUsername } from "../UsernameContextProvider";

export const Dashboard = () => {
  const { userRole } = useUsername();
  return (
    <div className="flex h-[800px]">
      <Sidebar />
      <Outlet />
    </div>
  );
};
