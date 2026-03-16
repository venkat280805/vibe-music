import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavbarContainer from "./NavbarContainer";

const Layout = () => {
  return (
    <div className="bg-slate-800">
      <Toaster />
      <NavbarContainer />
      <Outlet />
    </div>
  );
};

export default Layout;
