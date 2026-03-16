import React from "react";
import AlbumLandingSidebar from "./AlbumLandingSidebar";
import { Outlet } from "react-router-dom";

const AlbumLandingContainer = () => {
  return (
    <section className="bg-slate-800 flex h-screen mt-[70px]">
      <AlbumLandingSidebar />
      <div className="flex-1 overflow-y-auto scrollbar-hide scroll-smooth">
        <Outlet />
      </div>
    </section>
  );
};

export default AlbumLandingContainer;
