import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";


export const Dashboard = () => {
  return (
    <div className="flex h-[800px]">
      <Sidebar />
      <Outlet />
    </div>
  );
};
