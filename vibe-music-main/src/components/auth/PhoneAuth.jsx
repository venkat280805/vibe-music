import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import { __AUTH } from "../../backend/firebase";
import { useNavigate } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";
import toast from "react-hot-toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const PhoneAuth = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      let recaptchaVerifier = new RecaptchaVerifier(
        __AUTH,
        "captcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          },
        }
      );

      //! Sign in with phone number
      const confirmResult = await signInWithPhoneNumber(
        __AUTH,
        phone,
        recaptchaVerifier
      );
      toast.success(`OTP verification code sent to your registered ${phone}`);
      let otp = window.prompt("Enter otp");
      let user = await confirmResult.confirm(otp);
      console.log(user);
      toast.success("Successfully logged-in with otp");
      navigate("/user/profile/my-account", { replace: true });
    } catch (error) {
      toast.error(error.code);
      console.log(error)
    } finally {
      setIsLoading(false);
    }

    setPhone("");
  };

  return (
    <section>
      <article className="container h-[100%-70px] bg-gray-850 flex flex-col justify-center py-12">
        <header>
          <h1 className="mt-10 text-center text-3xl leading-5 text-purple-600 max-w">
            Login with OTP
          </h1>
        </header>
        <main className="mt-8 m-auto">
          <form
            className="w-[400px] flex flex-col justify-center bg-gray-700 p-5 rounded-xl border-b-2"
            onSubmit={handleSubmit}
          >
            <div className="py-2 relative">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your 10 digit phone number"
                className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* <div id="captcha-container"></div>
            <div className="p-2 flex justify-between">
              <span>
                <Link className="text-white text-sm">
                  Don't have an account?
                </Link>
              </span>
              <span>
                <Link
                  to="/auth/register"
                  className="text-white text-sm hover:border-b-2 hover:border-b-purple-500 hover:text-purple-400"
                >
                  Register
                </Link>
              </span>
            </div> */}
            <div className="p-2 flex justify-between mb-2">
              <span>
                <Link className="text-white text-sm">Forgotten Password?</Link>
              </span>
              <span>
                <Link
                  to="/auth/phone-auth"
                  className="text-white text-sm hover:border-b-2 hover:border-b-purple-500 hover:text-purple-400"
                >
                  Reset Password
                </Link>
              </span>
            </div>
            <div className="py-2">
              <button className="bg-purple-700 w-full flex justify-center py-2 px-4 border border-transparent text-sm font- my-1 rounded-md text-white hover:bg-purple-600 focus:outline-none">
                {isLoading ? "Loading.." : "Send OTP"}
              </button>
            </div>
          </form>
        </main>
      </article>
    </section>
  );
};

export default PhoneAuth;
