import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { BsFileEarmarkMusicFill } from "react-icons/bs";

const AdminSidebar = () => {
  return (
    <aside className="basis-[16%] bg-slate-900 min-h-[90vh] flex flex-col justify-between">
      <nav>
        <ul className="flex flex-col p-1 bg-gray-900 cursor-pointer sticky top-[100px]">
          <li>
            <NavLink
              to={"/admin"}
              end
              className="flex items-center gap-2 p-3 hover:bg-slate-700 rounded-sm mb-2"
              style={({ isActive }) => ({
                background: isActive && "#38485f",
              })}
            >
              <span className="text-slate-200 text-2xl">
                <AiFillDashboard />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/create-album"}
              className="flex items-center gap-2 p-3 hover:bg-slate-700 rounded-sm mb-2"
              style={({ isActive }) => ({
                background: isActive && "#38485f",
              })}
            >
              <span className="text-slate-200 text-2xl">
                <BsFileEarmarkMusicFill />
              </span>
              <span>Create Album</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
