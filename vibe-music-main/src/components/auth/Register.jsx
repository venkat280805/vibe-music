import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { __AUTH } from "../../backend/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import md5 from "md5";

// createUserWithEmailAndPassword (__AUTH, {email, password}) -> returns promise

const Register = () => {
  let navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isLoading: false,
  });

  let [type, setType] = useState(false);
  let [allowSubmit, setAllowSubmit] = useState(false);

  let { username, email, password, confirmPassword } = state;

  //! Handle Change
  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });

    if (
      username !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      setAllowSubmit(true);
    } else {
      setAllowSubmit(false);
    }
  };

  //! Handle Type for Password
  let handleType = (e) => {
    setType(!type);
  };

  //! Handle Submit
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Password does not matched!");
      } else {
        setState({ isLoading: true });
        //! createUserWithEmailAndPassword
        let userData = await createUserWithEmailAndPassword(
          __AUTH,
          email,
          password
        );

        //! Email verification
        sendEmailVerification(userData.user);
        const message = `Email verification has been send to your registered ${email}.`;

        //! Update User Profile Data which is not updated by default
        updateProfile(userData.user, {
          displayName: username,
          photoURL: `https://www.gravatar.com/avatar/${md5(email)}?q=identicon`,
        });
        toast.success("User has been registered successfully");
        toast.success(message);

        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <article className="h-[100%-70px] bg-gray-850 flex flex-col justify-center pt-12">
        <header>
          <h1 className="mt-10 text-center text-3xl leading-5 text-purple-600 max-w">
            Register
          </h1>
        </header>
        <main className="mt-8 m-auto">
          <form
            className="w-[400px] flex flex-col justify-center bg-gray-700 p-5 rounded-xl border-b-2"
            onSubmit={handleSubmit}
          >
            <div className="py-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                value={username}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="py-2 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
              >
                Password
              </label>
              <input
                type={type ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                value={password}
                onChange={handleChange}
                required
              />
              <span
                className="flex justify-center items-center absolute bottom-[20px] right-[10px]"
                onClick={handleType}
              >
                {type ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
            <div className="py-2 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-2 flex justify-between">
              <span>Already have an account?</span>
              <span>
                <Link
                  to="/auth/login"
                  className="text-white text-sm hover:border-b-2 "
                >
                  Login
                </Link>
              </span>
            </div>
            <div className="py-2">
              <button
                disabled={!allowSubmit}
                className={`bg-purple-700 w-full flex justify-center py-2 px-4 border border-transparent text-sm font- my-1 rounded-md text-white hover:bg-purple-600 focus:outline-none ${
                  allowSubmit ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                Register
              </button>
            </div>
          </form>
        </main>
      </article>
    </section>
  );
};

export default Register;
