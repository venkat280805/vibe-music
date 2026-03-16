import React from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContextApi";
import { useContext } from "react";

const Menu = () => {
  const { authUser, logout } = useContext(AuthContext);

  let AuthenticatedUser = () => {
    return (
      <>
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-white hover:bg-blue-800 px-4 py-2 font-semibold pointer-events-auto ml-5 rounded-md flex items-center justify-center tracking-wider ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            <span className="mx-1">Admin</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/profile/my-account"
            className={({ isActive }) =>
              `text-white hover:bg-blue-800 px-2 gap-2 py-2 font-semibold pointer-events-auto ml-2 h-10 rounded-md flex items-center justify-between tracking-wider ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            <span className="mx-1">{authUser?.displayName}</span>
            <span className="mx-1 w-[40px]">
              <img
                src={authUser?.photoURL}
                alt={authUser?.displayName}
                className="h-[35px] w-[35px] rounded-full"
              />
            </span>
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => logout()}
            className="text-white hover:bg-blue-800 px-4 py-2 font-semibold pointer-events-auto ml-2 rounded-md flex items-center justify-center tracking-wider"
          >
            Logout
          </button>
        </li>
      </>
    );
  };

  let AnonymousUser = () => {
    return (
      <>
        <li>
          <NavLink
            style={({ isActive }) =>
              isActive ? { background: "#1D4ED8" } : {}
            }
            to={"/auth/login"}
            className={({ isActive }) =>
              `text-white hover:bg-blue-800 px-3 py-2 font-semibold pointer-events-auto ml-5 rounded-md flex items-center justify-center tracking-wider ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) =>
              isActive ? { background: "#1D4ED8" } : {}
            }
            to={"/auth/register"}
            className={({ isActive }) =>
              `text-white hover:bg-blue-800 px-3 py-2 font-semibold pointer-events-auto ml-5 h-10 rounded-md flex items-center justify-center tracking-wider ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            Register
          </NavLink>
        </li>
      </>
    );
  };
  return (
    <aside>
      <menu className="flex gap-3">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `text-white hover:bg-blue-800 px-3 py-2 font-semibold pointer-events-auto ml-5 rounded-md flex items-center justify-center tracking-wider ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>
        {authUser === null ? <AnonymousUser /> : <AuthenticatedUser />}
      </menu>
    </aside>
  );
};

export default Menu;
