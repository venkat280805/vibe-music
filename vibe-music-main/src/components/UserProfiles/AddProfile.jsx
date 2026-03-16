import React, { useContext, useEffect, useState } from "react";
import { __AUTH, __DB } from "../../backend/firebase";
import { AuthContext } from "../../components/context/AuthContextApi";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import StateWithCities from "./statewithcities.json";
import LangJSON from "./languages.json";
import Countries from "./countries.json";

const AddProfile = () => {
  let navigate = useNavigate();
  let location = useLocation();
  console.log(location);
  const { authUser } = useContext(AuthContext);
  const { uid } = authUser || "";

  const [profileData, setProfileData] = useState({
    firstname: location?.state?.firstname,
    lastname: location?.state?.lastname,
    gender: location?.state?.gender,
    dob: location?.state?.dob,
    age: location?.state?.age,
    address: location?.state?.address,
    city: location?.state?.city,
    state: location?.state?.state,
    country: location?.state?.country,
    language: [location?.state?.language],
  });

  const [isLoading, setIsLoading] = useState(false);

  //! State for City Options
  const [cityOptions, setCityOptions] = useState([]);

  //! State for mulitple languages
  const [lang, setLang] = useState([]);

  const {
    firstname,
    lastname,
    gender,
    dob,
    age,
    address,
    city,
    state,
    country,
    language,
  } = profileData;

  //! Handle Change for selected languages
  let handleLanguage = (e) => {
    const selectedLang = e.target.value;
    setLang([selectedLang]);
    setProfileData({ ...profileData, language: selectedLang });
  };

  //! Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });

    //! Update city options when state changes
    if (name === "state") {
      const cities = StateWithCities[value] || [];
      setCityOptions(cities);
    }
  };

  //! Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, displayName, photoURL } = authUser;

    //! Payload Object -> Payload Creation
    let payload = {
      firstname,
      lastname,
      gender,
      city,
      state,
      country,
      address,
      dob,
      age,
      language,
    };
    setIsLoading(true);

    //! Sending Data to Database (Cloud Firestore)
    const user_profile_collection = doc(__DB, "user_profile", uid); //! Creating a Document Reference
    //! Writing Data to Firestore
    await setDoc(user_profile_collection, {
      uid,
      displayName,
      photoURL,
      email,
      ...payload,
    });

    toast.success("User profile has been updated sucessfully");
    navigate("/user/profile/my-account", { replace: true });

    try {
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <article className="container flex flex-col justify-center py-12">
        <header>
          <h1 className="text-center text-3xl leading-5 text-purple-600 max-w">
            Update Profile
          </h1>
        </header>
        <main className="mt-8 m-auto">
          <form
            className="w-[700px] flex flex-col justify-center bg-gray-600  p-5 rounded-xl border-b-2"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-4 bg-gray-700 rounded-lg p-4 mb-3">
              <div className="w-1/2 py-2">
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
                >
                  FirstName
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                  value={firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2 py-2">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
                >
                  LastName
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                  value={lastname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 bg-gray-700 rounded-lg p-4 mb-3">
              <div className="w-1/2 py-2">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
                >
                  DOB
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none appearance-none"
                  value={dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2 py-2">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
                >
                  Age
                </label>
                <input
                  type="text"
                  name="age"
                  id="age"
                  className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                  value={age}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="py-2 bg-gray-700 rounded-lg p-4 mb-3">
              <label className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider">
                Gender
              </label>
              <div className="flex items-center gap-5 py-1">
                <label className="text-gray-100 mr-4 flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={handleChange}
                    className="mr-2 w-4 h-4 text-blue-600 border-2 border-gray-400 focus:ring-2 focus:ring-blue-500 checked:bg-blue-600"
                  />
                  Male
                </label>
                <label className="text-gray-100 mr-4 flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={handleChange}
                    className="mr-2 w-4 h-4 text-blue-600 border-2 border-gray-400 focus:ring-2 focus:ring-blue-500 checked:bg-blue-600"
                  />
                  Female
                </label>
                <label className="text-gray-100 mr-4 flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={gender === "Other"}
                    onChange={handleChange}
                    className="mr-2 w-4 h-4 text-blue-600 border-2 border-gray-400 focus:ring-2 focus:ring-blue-500 checked:bg-blue-600"
                  />
                  Other
                </label>
              </div>
            </div>
            <div className="py-2 bg-gray-700 rounded-lg p-4 mb-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
              >
                Address
              </label>
              <textarea
                name="address"
                id="address"
                value={address}
                onChange={handleChange}
                className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                required
              ></textarea>
            </div>
            <div className="flex gap-4 bg-gray-700 rounded-lg p-4 mb-3">
              <div className="w-1/2 py-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
                >
                  Country
                </label>
                <input
                  list="countries"
                  name="country"
                  id="country"
                  className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                  value={country}
                  onChange={handleChange}
                  required
                />
                <datalist id="countries">
                  {Countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </datalist>
              </div>

              <div className="w-1/2 py-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
                >
                  State
                </label>
                <input
                  list="states"
                  name="state"
                  id="state"
                  className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                  value={state}
                  onChange={handleChange}
                  required
                />
                <datalist id="states">
                  {Object.keys(StateWithCities).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>

            <div className="flex gap-4 bg-gray-700 rounded-lg p-4 mb-3">
              <div className="w-1/2 py-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
                >
                  City
                </label>
                <input
                  list="cities"
                  name="city"
                  id="city"
                  className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                  value={city}
                  onChange={handleChange}
                  required
                />
                <datalist id="cities">
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </datalist>
              </div>

              <div className="w-1/2 py-2">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium leading-5 text-gray-100 py-1 tracking-wider"
                >
                  Language
                </label>
                <input
                  list="languages"
                  name="language"
                  id="language"
                  className="w-full p-2 rounded-sm border-gray-500 border bg-transparent focus:outline-none"
                  value={language}
                  onChange={(e) => handleLanguage(e)}
                />
                <datalist id="languages">
                  {LangJSON.map((lang, index) => (
                    <option key={index} value={lang}>
                      {lang}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>

            <div className="py-4 text-center">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-green-600">
                {isLoading ? "Loading..." : "Add Profile"}
              </button>
            </div>
          </form>
        </main>
      </article>
    </section>
  );
};

export default AddProfile;
