import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../context/AuthContextApi";
import Spinner from "../../helpers/Spinner";
import { TbPhotoEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { __DB } from "../../backend/firebase";
import { FaRegEdit } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";

const MyAccount = () => {
  let { authUser } = useContext(AuthContext || {});

  // console.log(authUser);

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState("");
  let { uid } = authUser || "";

  // let fetchProfile = useCallback(async () => {
  //   onSnapshot(doc(__DB, "user_profile", uid), (data) => {
  //     console.log(data);
  //   });
  // }, [uid]);

  useEffect(() => {
    let fetchProfile = async () => {
      if (uid) {
        onSnapshot(doc(__DB, "user_profile", uid), (userDoc) => {
          if (userDoc.exists()) {
            setProfile(userDoc.data());
            setLoading(false);
            console.log(userDoc.data());
          } else {
            console.log("User profile not found");
            setLoading(false);
          }
        });
      } else {
        console.log("User ID is not available");
        setLoading(false);
      }
    };
    fetchProfile();
  }, [uid]);

  return (
    <section className=" max-w-3xl m-auto h-[550px] flex items-center justify-center p-4 rounded-md">
      <article className="flex flex-col w-full bg-slate-600 m-auto mt-12 rounded-md h-[570px] items-center border-b-2">
        <header className="flex w-full h-32 bg-slate-800 justify-center items-center rounded-t-md">
          <figure className="absolute top-[90px] text-center flex items-center flex-col">
            <div className="relative inline-block">
              <img
                src={authUser?.photoURL}
                alt={authUser?.displayName}
                className="rounded-full w-28 h-28 border-2"
              />
              <Link
                to={"/user/profile/upload-photo"}
                title="upload profile photo"
                className="absolute top-20 right-[-10px] -translate-y-1/2 text-2xl bg-slate-700 text-white p-1 rounded-full hover:bg-white hover:text-black shadow-md"
              >
                <TbPhotoEdit />
              </Link>
            </div>
            <figcaption className="my-3">
              <h2>{authUser?.displayName}</h2>
              <p>{authUser?.email}</p>
            </figcaption>
          </figure>
        </header>
        <main>
          {profile ? (
            <>
              <header className="w-[650px] flex items-center justify-between">
                <h1 className="text-2xl text-center text-gray-300 tracking-wider py-4 ml-1 font-semibold">
                  Personal Details
                </h1>
                <Link
                  to={"/user/profile/add-profile"}
                  state={profile}
                  className="flex items-center gap-2 text-sm bg-purple-600 hover:bg-green-600 p-2 rounded-lg hover:text-white mr-1"
                >
                  <span>Edit details</span>
                  <FaRegEdit />
                </Link>
              </header>
              <aside>
                <div className="flex space-x-4">
                  <div className="flex-1 border-b-2 bg-gray-700 p-4 rounded-lg border-gray-500">
                    <span className="mr-2">Full Name:</span>
                    <span className="text-gray-300">
                      <span>{profile?.firstname} </span>
                      <span> {profile?.lastname}</span>
                    </span>
                  </div>
                  <div className="flex-1 border-b-2 bg-gray-700 p-4 rounded-lg border-gray-500">
                    <span className="mr-2">DOB:</span>
                    <span className="text-gray-300">{profile?.dob}</span>
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <div className="flex-1 border-b-2 bg-gray-700 p-4 rounded-lg border-gray-500">
                    <span className="mr-2">Gender:</span>
                    <span className="text-gray-300">{profile?.gender}</span>
                  </div>
                  <div className="flex-1 border-b-2 bg-gray-700 p-4 rounded-lg border-gray-500">
                    <span className="mr-2">Age:</span>
                    <span className="text-gray-300">{profile?.age}</span>
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <div className="flex-1 border-b-2 bg-gray-700 p-4 rounded-lg border-gray-500">
                    <span className="mr-2">Country:</span>
                    <span className="text-gray-300">{profile?.country}</span>
                  </div>
                  <div className="flex-1 border-b-2 bg-gray-700 p-4 rounded-lg border-gray-500">
                    <span className="mr-2">Language:</span>
                    <span className="text-gray-300">{profile?.language}</span>
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <div className="flex-1 border-b-2 bg-gray-700 p-4 rounded-lg border-gray-500">
                    <span className="mr-2">State:</span>
                    <span className="text-gray-300">{profile?.state}</span>
                  </div>
                  <div className="flex-1 border-b-2 bg-gray-700 p-4 rounded-lg border-gray-500">
                    <span className="mr-2">City:</span>
                    <span className="text-gray-300">{profile?.city}</span>
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <div className="flex-1 border-b-2 bg-gray-700 p-4 rounded-lg border-gray-500">
                    <span className="mr-2">Address:</span>
                    <span className="text-gray-300">{profile?.address}</span>
                  </div>
                </div>
              </aside>
            </>
          ) : (
            <aside className="w-[600px] flex flex-col justify-evenly items-center">
              <h1 className="text-3xl px-4 py-2 rounded-md mt-8">
                User details not found
              </h1>
              <header className="text-[150px] text-red-600 mb-8 mt-4 ml-10">
                <FaUserTimes />
              </header>
              <Link
                to={"/user/profile/add-profile"}
                className="py-2 px-4 bg-purple-600 rounded-lg hover:bg-green-600"
              >
                Add details
              </Link>
            </aside>
          )}
        </main>
      </article>
    </section>
  );
};

export default MyAccount;
