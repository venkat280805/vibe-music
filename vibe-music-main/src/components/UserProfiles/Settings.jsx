import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { deleteUser } from "firebase/auth";
import { AuthContext } from "../context/AuthContextApi";

const Settings = () => {
  let { authUser } = useContext(AuthContext);

  const [confirmText, setConfirmText] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  //! Handle Change
  let handleChange = (e) => {
    setConfirmText(e.target.value);
  };

  //! Handle Submit
  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (confirmText !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }

    try {
      let confirmUser = window.confirm(
        "Are you sure want to delete your account?"
      );
      if (confirmUser) {
        //! Delete User Account
        await deleteUser(authUser);
        toast.success("Successfully deleted user account");
        setTimeout(() => {
          window.location.assign("/auth/login");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.code);
      console.log("Error while deleting:", error);
    }
    setIsLoading(false);
  };
  return (
    <section className="w-[80vw] flex justify-center mt-20 ">
      <aside className="bg-slate-700 flex flex-col justify-center items-center mt-18 p-5 rounded-lg">
        <header className="mb-5">
          <h1 className="text-4xl my-3 font-bold text-purple-500">Deleting Account</h1>
          <p>
            Deleting your account will remove all of your information from our
            database. <br /> This cannot be recover.
          </p>
        </header>
        <main className="w-full flex justify-center">
          <form
            action=""
            className="flex gap-44 justify-between items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="delete" className="px-5 mb-4">
                To confirm this, type
                <code className="bg-gray-600 ml-1">"DELETE"</code>
              </label>
              <input
                type="text"
                name="delete"
                id="delete"
                className="py-1 ml-5 mb-5 border border-gray-600 rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-indigo-600 "
                value={confirmText}
                onChange={handleChange}
              />
            </div>
            <button
              className={`py-2 px-4 ${
                confirmText === "DELETE"
                  ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                  : "bg-gray-600 cursor-not-allowed"
              }  rounded-lg  mt-4 mr-6`}
              disabled={confirmText !== "DELETE"}
            >
              Delete account
            </button>
          </form>
        </main>
      </aside>
    </section>
  );
};

export default Settings;
