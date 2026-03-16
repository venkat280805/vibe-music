import React from "react";
import { NavLink } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";

const ProfileSidebar = () => {
  return (
    <aside className="basis-[16%] bg-slate-700 min-h-[90vh] flex flex-col justify-between">
      <nav>
        <ul className="flex flex-col p-1 bg-gray-700 cursor-pointer">
          <li>
            <NavLink
              to={"/user/profile/my-account"}
              className="flex items-center gap-2 p-3 hover:bg-slate-500 rounded-sm mb-2"
              style={({ isActive }) => ({
                background: isActive && "#64748B",
              })}
            >
              <span className="text-slate-200 text-2xl">
                <MdAccountCircle />
              </span>
              <span>My Account</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/user/profile/add-profile"}
              className="flex items-center gap-2 p-3 hover:bg-slate-500 rounded-sm mb-2"
              style={({ isActive }) => ({
                background: isActive && "#64748B",
              })}
            >
              <span className="text-slate-200 text-2xl">
                <IoPersonAdd />
              </span>
              <span>Add Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/user/profile/change-password"}
              className="flex items-center gap-2 p-3 hover:bg-slate-500 rounded-sm mb-2"
              style={({ isActive }) => ({
                background: isActive && "#64748B",
              })}
            >
              <span className="text-slate-200 text-2xl">
                <RiLockPasswordFill />
              </span>
              <span>Change Password</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/user/profile/upload-photo"}
              className="flex items-center gap-2 p-3 hover:bg-slate-500 rounded-sm mb-2"
              style={({ isActive }) => ({
                background: isActive && "#64748B",
              })}
            >
              <span className="text-slate-200 text-2xl">
                <MdAddPhotoAlternate />
              </span>
              <span>Upload Profile Photo</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/user/profile/settings"}
              className="flex items-center gap-2 p-3 hover:bg-slate-500 rounded-sm mb-2"
              style={({ isActive }) => ({
                background: isActive && "#64748B",
              })}
            >
              <span className="text-slate-200 text-2xl">
                <IoSettings />
              </span>
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <footer className="w-full bg-purple-600 hover:bg-red-600 rounded-md cursor-pointer py-2 text-lg text-center">
        <NavLink to={"/user/profile/settings"}>Delete Account</NavLink>
      </footer>
    </aside>
  );
};

export default ProfileSidebar;
