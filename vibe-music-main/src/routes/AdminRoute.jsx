import React, { useContext, useState } from "react";
import { AuthContext } from "../components/context/AuthContextApi";
import { __DB } from "../backend/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminRoute = ({ children }) => {
  let navigate = useNavigate();
  let [role, setRole] = useState("");
  const { authUser } = useContext(AuthContext);

  let { uid } = authUser || "";

  if (
    (uid !== undefined && authUser.accessToken) ||
    window.localStorage.getItem("TOKEN")
  ) {
    //! Fetching Data from Database and Update with react state
    const fetchAdminUser = async () => {
      let adminRef = doc(__DB, "user_profile", uid);
      let adminRole = await getDoc(adminRef);
      let { role } = adminRole?.data();
      setRole(role);
    };
    fetchAdminUser();

    //! Check for normal user and admin user
    if (role !== undefined || (role !== null && role === "admin")) {
      return <>{children}</>;
    } else {
      if (role === undefined || role === null || role === "") {
        toast.error("Unauthorized access");
        navigate("/user/profile/my-account");
      }
    }
  } else {
    return navigate("/auth/login");
  }
};

export default AdminRoute;
