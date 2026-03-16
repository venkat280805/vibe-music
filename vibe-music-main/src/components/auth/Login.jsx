import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoEyeOff } from "react-icons/io5";
import { __AUTH } from "../../backend/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  let togglePassword = () => {
    setToggle(!toggle);
    setShowPassword(!showPassword);
  };

  //! Handle Remember Me
  let handleRememberMe = () => {
    setRememberMe(!rememberMe);
    if (rememberMe) {
      localStorage.removeItem("rememberedEmail");
    } else {
      localStorage.setItem("rememberedEmail", email);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log({email, password});
      //! Sign-in method
      let userData = await signInWithEmailAndPassword(__AUTH, email, password);
      // console.log(userData.user);
      if (userData.user.emailVerified === true) {
        toast.success(`Successfully ${email} is logged in`);
        navigate("/");
        window.location.reload();
      } else {
        toast.error("Email not yet verified");
      }
    } catch (error) {
      console.log(error);
      // toast.loading("validating..");
      toast.error(error.code.slice(5));
    }
    setEmail("");
    setPassword("");
    setIsloading(false);
  };
  return (
    <section>
      <article className="container h-[100%-70px] bg-gray-850 flex flex-col justify-center py-12">
        <header>
          <h1 className="mt-10 text-center text-3xl leading-5 text-purple-600 max-w">
            Login with Email
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (rememberMe) {
                    localStorage.setItem("rememberedEmail", e.target.value);
                  }
                }}
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
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <span
                className="flex justify-center items-center absolute bottom-[20px] right-[10px]"
                onClick={togglePassword}
              >
                {showPassword ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
            <div className="p-2 flex justify-between">
              <span className="flex justify-around items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                  className="mr-1 accent-indigo-700"
                />
                Remember Me
              </span>
              <span>
                <Link
                  to="/auth/register"
                  className="text-white text-sm hover:border-b-2 hover:border-b-purple-500 hover:text-purple-400"
                >
                  Don't have an account?
                </Link>
              </span>
            </div>
            <div className="p-2 flex justify-between mb-2">
              <span>
                <Link className="text-white text-sm">Forgotten Password</Link>
              </span>
              <span>
                <Link
                  to="/auth/resetpassword"
                  className="text-white text-sm hover:border-b-2 hover:border-b-purple-500 hover:text-purple-400"
                >
                  Reset Password
                </Link>
              </span>
            </div>
            <div className="py-2">
              <button className="bg-purple-700 w-full flex justify-center py-2 px-4 border border-transparent text-sm font- my-1 rounded-md text-white hover:bg-purple-600 focus:outline-none">
                {isLoading ? "loading.." : "Login"}
              </button>
            </div>
            <div className="py-2 flex justify-center items-center">
              <Link
                to={"/auth/phone-auth"}
                className=" flex gap-2 items-center text-sm text-center py-2 px-4 rounded-lg hover:bg-purple-600"
              >
                <span>Login with phone number</span>
                <span>
                  <FaArrowRightToBracket />
                </span>
              </Link>
            </div>
          </form>
        </main>
      </article>
    </section>
  );
};

export default Login;
