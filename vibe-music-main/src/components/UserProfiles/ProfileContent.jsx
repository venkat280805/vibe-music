import React from "react";
import { Outlet } from "react-router-dom";

const ProfileContent = () => {
  return (
    <section className="basis-[84%] bg-slate-900 p-2">
      <Outlet />
    </section>
  );
};

export default ProfileContent;
