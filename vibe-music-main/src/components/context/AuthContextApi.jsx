import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  let [authUser, setAuthUser] = useState(null);
  let [isLoading, setIsloading] = useState(null);

  const logout = async () => {
    await signOut(__AUTH);
    window.localStorage.removeItem("TOKEN");
    toast.success("Logout Successfully");
    setTimeout(() => {
      window.location.assign("/"); //Window API for Hard Refresh -> Forcing to refresh the page
    }, 1000);
  };

  useEffect(() => {
    return onAuthStateChanged(__AUTH, (userInfo) => {
      // console.log(userInfo);
      if (userInfo?.emailVerified === true && userInfo?.isAnonymous === false) {
        setIsloading(true);
        setAuthUser(userInfo);
        window.localStorage.setItem("TOKEN", userInfo.accessToken);
      } else {
        setIsloading(false);
        setAuthUser(null);
        window.localStorage.removeItem("TOKEN");
      }
    });
  }, [isLoading]);

  return (
    <AuthContext.Provider value={{ authUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
