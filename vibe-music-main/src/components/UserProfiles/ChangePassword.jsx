import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { __AUTH } from "../../backend/firebase";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContextApi";

const ChangePassword = () => {
  let { authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setPassword(value);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      //! Change or update Password
      await updatePassword(authUser, password);
      toast.success("New password has been updated");
      navigate("/user/profile/my-account");
    } catch (error) {
      toast.error(error.code.slice(5));
    }
    setPassword("");
    setIsloading(false);
  };
  return (
    <section>
      <article className="h-[100%-70px] bg-gray-850 flex flex-col justify-center py-12">
        <header>
          <h1 className="mt-10 text-center text-3xl leading-5 text-purple-600 max-w">
            Change Password
          </h1>
        </header>
        <main className="mt-8 m-auto">
          <form
            className="w-[400px] flex flex-col justify-center bg-gray-700 p-5 rounded-xl border-b-2"
            onSubmit={handleSubmit}
          >
            <div className="py-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your new password"
                className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="py-2">
              <button className="bg-purple-700 w-full flex justify-center py-2 px-4 border border-transparent text-sm font- my-1 rounded-md text-white hover:bg-green-600 focus:outline-none">
                {isLoading ? "loading.." : "Change Password"}
              </button>
            </div>
          </form>
        </main>
      </article>
    </section>
  );
};

export default ChangePassword;
