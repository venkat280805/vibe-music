import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../context/AuthContextApi";
import { useNavigate } from "react-router-dom";

const UploadProfilePhoto = () => {
  let navigate = useNavigate();
  let authUser = useContext(AuthContext);
  //   console.log(authUser.authUser);

  let [photoFile, setPhotoFile] = useState("");
  let [photoPreview, setPhotoPreview] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  let handleChange = (e) => {
    let file = e.target.files[0];
    setPhotoFile(file);
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file); //! This converts the file into a base64 string (Way to encode Binary Data)
      reader.onloadend = function (e) {
        setPhotoPreview(e.target.result); //! e.target.result contains the base64 string
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      if (!photoFile) {
        setIsLoading(false);
        toast.error("Please select a file before uploading");
        return;
      }

      //! Convert File to Binary Data
      const data = new FormData();
      data.append("file", photoFile); //! Add the file to the FormData object
      data.append("upload_preset", "live music"); //! Add the upload preset
      data.append("cloud_name", "dozbs0vok"); //! Add the Cloudinary cloud name

      //! Connect Cloudinary API and Send File => window.fetch();
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dozbs0vok/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      // console.log(result.url);
      const imageUrl = result.url;

      await updateProfile(authUser.authUser, {
        photoURL: imageUrl,
      });
      navigate("/user/profile/my-account"); //! Navigate back to my-account
      toast.success("Profile photo updated successfully!");
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section>
      <article className="container h-[100%-70px] bg-gray-850 flex flex-col justify-center py-12">
        <header className="flex flex-col m-auto">
          <h1 className="mt-10 mb-2 text-center text-3xl leading-5 text-purple-600 max-w">
            Upload Profile Photo
          </h1>
        </header>
        <main className="mt-4 m-auto">
          <form
            className="w-[400px] flex flex-col justify-center bg-gray-700 p-5 rounded-xl border-b-2 mt-4"
            onSubmit={handleSubmit}
          >
            <div className="py-2">
              <label
                htmlFor="file"
                className="block text-center text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider mb-2"
              >
                Upload Profile Photo Here
              </label>
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="rounded-full h-[150px] w-[150px] mt-4 mb-4 mx-auto border-4 border-slate-200 shadow-lg object-cover"
                />
              )}
              <input
                type="file"
                name="file"
                id="file"
                placeholder="Upload a profile photo"
                className="w-full p-2 rounded-sm border-gray-500 file:cursor-pointer border bg-transparent focus:outline-none text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm  file:tracking-wider file:bg-slate-500 file:text-white hover:file:text-black hover:file:bg-white"
                onChange={handleChange}
              />
            </div>
            <div className="py-2 flex items-center justify-between">
              <Link
                to={"/user/profile/my-account"}
                className="bg-purple-600 w-44 flex justify-center py-2 gap-2 border border-transparent text-sm my-1 rounded-md text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="bg-purple-600 w-44 flex justify-center py-2 border border-transparent text-sm my-1 rounded-md text-white hover:bg-green-600 focus:outline-none"
              >
                {isLoading ? "Uploading.." : "Upload Photo"}
              </button>
            </div>
          </form>
        </main>
      </article>
    </section>
  );
};

export default UploadProfilePhoto;
