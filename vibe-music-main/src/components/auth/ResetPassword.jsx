import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { __AUTH } from "../../backend/firebase";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setEmail(value);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      //! Reset Password
      await sendPasswordResetEmail(__AUTH, email);
      toast.success(
        `Password reset link has been sent to your registered ${email} address`
      );
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.code.slice(5));
    }
    // setEmail("");
    setIsloading(false);
  };
  return (
    <section>
      <article className="container h-[100%-70px] bg-gray-850 flex flex-col justify-center py-12">
        <header>
          <h1 className="mt-10 text-center text-3xl leading-5 text-purple-600 max-w">
            Reset Password
          </h1>
        </header>
        <main className="mt-8 m-auto">
          <form
            className="w-[400px] flex flex-col justify-center bg-gray-700 p-5 rounded-xl border-b-2"
            onSubmit={handleSubmit}
          >
            <div className="py-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-2 flex justify-between">
              <span>
                <Link
                  to="/auth/login"
                  className="text-white text-sm hover:border-b-2"
                >
                  Already have password?
                </Link>
              </span>
              <span>
                <Link
                  to="/auth/login"
                  className="text-white py-1 text-sm hover:border-b-2 hover:text-purple-500 tracking-wider  hover:border-purple-700"
                >
                  Login
                </Link>
              </span>
            </div>
            <div className="py-2">
              <button className="bg-purple-700 w-full flex justify-center py-2 px-4 border border-transparent text-sm font- my-1 rounded-md text-white hover:bg-green-600 focus:outline-none">
                {isLoading ? "loading.." : "Reset Password"}
              </button>
            </div>
          </form>
        </main>
      </article>
    </section>
  );
};

export default ResetPassword;
