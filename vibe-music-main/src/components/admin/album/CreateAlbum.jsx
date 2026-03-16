import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import { __DB } from "../../../backend/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateAlbum = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);

  //! State for album
  const [album, setAlbum] = useState({
    title: "",
    language: "",
    description: "",
    dateCreated: "",
    albumType: "",
    thumbnailAlbum: null,
    songCount: "",
    actors: "",
    director: "",
    releaseYear: "",
    songs: [],
  });

  let {
    title,
    language,
    description,
    dateCreated,
    albumType,
    songCount,
    thumbnailAlbumPreview,
    actors,
    director,
    releaseYear,
  } = album;

  //! State for song
  const [songsList, setSongsList] = useState([
    {
      songName: "",
      singers: "",
      lyricists: "",
      musicDirector: "",
      thumbnailSong: null,
      songFile: null,
    },
  ]);

  let { songName, singers, lyricists, musicDirector } = songsList;

  //! Handle change for album inputs
  const handleAlbumChange = (e) => {
    const { name, value } = e.target;
    setAlbum({ ...album, [name]: value });
  };

  //! Handle change for album thumbnail
  const handleAlbumThumbnailChange = (e) => {
    const file = e.target.files[0];
    setAlbum({
      ...album,
      thumbnailAlbum: file,
      thumbnailAlbumPreview: URL.createObjectURL(file),
    });
  };

  //! Handle change for song inputs
  const handleSongChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSongs = [...songsList];
    updatedSongs[index][name] = value;
    setSongsList(updatedSongs);
  };

  //! Handle change for song thumbnail
  const handleSongThumbnailChange = (index, e) => {
    const file = e.target.files[0];
    const updatedSongs = [...songsList];
    updatedSongs[index].thumbnailSong = file;
    updatedSongs[index].thumbnailPreview = URL.createObjectURL(file);
    setSongsList(updatedSongs);
  };

  //! Handle song file change
  const handleSongFileChange = (index, e) => {
    const file = e.target.files[0];
    const updatedSongs = [...songsList];
    updatedSongs[index].songFile = file;
    updatedSongs[index].songPreview = URL.createObjectURL(file);
    setSongsList(updatedSongs);
  };

  //! Add song
  const addSong = () => {
    setSongsList([
      ...songsList,
      {
        songName: "",
        singers: "",
        lyricists: "",
        musicDirector: "",
        thumbnailSong: null,
        songFile: null,
      },
    ]);
  };

  //! Remove song
  const removeSong = (index) => {
    const updatedSongs = songsList.filter((_, i) => i !== index);
    setSongsList(updatedSongs);
  };

  //! Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let uploadedAlbumThumbnailURL = "";

      if (album.thumbnailAlbum) {
        //! Adding album thumbnail data to form
        const formData = new FormData();
        formData.append("file", album.thumbnailAlbum);
        formData.append("upload_preset", "live music");
        formData.append("cloud_name", "dozbs0vok");

        //! Uploading album thumbnail to cloudinary
        const thumbnailAlbumResult = await axios.post(
          "https://api.cloudinary.com/v1_1/dozbs0vok/upload",
          formData
        );
        uploadedAlbumThumbnailURL = thumbnailAlbumResult.data.url;
      }

      //! Wait for all the song files uploads to complete
      const uploadedSongs = await Promise.all(
        songsList.map(async (song, index) => {
          let songThumbnailURL = "";
          //! Adding song thumbnail to form data
          if (song.thumbnailSong) {
            const formData = new FormData();
            formData.append("file", song.thumbnailSong);
            formData.append("upload_preset", "live music");
            formData.append("cloud_name", "dozbs0vok");

            //! Uploading song thumbnail to cloudinary
            const thumbnailSongResult = await axios.post(
              "https://api.cloudinary.com/v1_1/dozbs0vok/upload",
              formData
            );
            songThumbnailURL = thumbnailSongResult.data.url;
          }

          //! Adding song file to the form data
          const formData = new FormData();
          formData.append("file", song.songFile);
          formData.append("upload_preset", "live music");
          formData.append("cloud_name", "dozbs0vok");

          //! Uploading song file to cloudinary
          const songResult = await axios.post(
            "https://api.cloudinary.com/v1_1/dozbs0vok/upload",
            formData,
            {
              onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress((prev) => {
                  const newProgress = [...prev];
                  newProgress[songsList.indexOf(song)] = percentCompleted;
                  return newProgress;
                });
              },
            }
          );

          //! Extracting required data and returning updated song object
          return {
            id: songResult.data.asset_id,
            url: songResult.data.url,
            name: songResult.data.original_filename,
            duration: (() => {
              const seconds = Math.floor(songResult.data.duration);
              const minutes = Math.floor(seconds / 60);
              const remainingSeconds = seconds % 60;
              return `${minutes}:${remainingSeconds
                .toString()
                .padStart(2, "0")}`;
            })(),

            size: (songResult.data.bytes / (1024 * 1024)).toFixed(2) + " MB",
            format: songResult.data.format,
            thumbnailSong: songThumbnailURL,
            singers: song.singers,
            musicDirector: song.musicDirector,
            lyricists: song.lyricists,
          };
        })
      );

      console.log("Uploaded Songs:", uploadedSongs);

      setSongsList(uploadedSongs);

      //! Sending data to database
      const payload = {
        ...album,
        thumbnailAlbum: uploadedAlbumThumbnailURL,
        songs: uploadedSongs,
      };

      console.log(payload);

      //! Adding album to database
      const albumCollection = collection(__DB, "albums");
      await addDoc(albumCollection, payload); //! Adding document inside the collection in firebase
      toast.success("Album created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.error("Upload Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-[100px]  ml-[50px] w-[70vw]">
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center p-4">
        <form
          className="bg-gray-900 p-6 rounded-lg shadow-xl w-full space-y-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-center">Add Album</h1>
          <section className="grid grid-cols-3 gap-3 w-full">
            <div>
              <label htmlFor="title" className="block mb-2 font-medium ml-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                value={title}
                onChange={handleAlbumChange}
                required
              />
            </div>
            <div>
              <label htmlFor="language" className="block mb-2 font-medium ml-1">
                Language
              </label>
              <input
                type="text"
                name="language"
                id="language"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                value={language}
                onChange={handleAlbumChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="albumType"
                className="block mb-2 font-medium ml-1"
              >
                Album Type
              </label>
              <input
                type="text"
                name="albumType"
                id="albumType"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                value={albumType}
                onChange={handleAlbumChange}
                required
              />
            </div>
          </section>

          <section>
            <label
              htmlFor="description"
              className="block mb-2 font-medium ml-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
              value={description}
              onChange={handleAlbumChange}
              required
            />
          </section>

          <section className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="dateCreated"
                className="block mb-2 font-medium ml-1"
              >
                Date Created
              </label>
              <input
                type="date"
                name="dateCreated"
                id="dateCreated"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                value={dateCreated}
                onChange={handleAlbumChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="releaseYear"
                className="block mb-2 font-medium ml-1"
              >
                Release Year
              </label>
              <input
                type="number"
                name="releaseYear"
                id="releaseYear"
                min={1970}
                max={2025}
                step={1}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 file:rounded-md file:border-0 focus:outline-none focus:ring-1 focus:ring-slate-500"
                value={releaseYear}
                onChange={handleAlbumChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="songCount"
                className="block mb-2 font-medium ml-1"
              >
                Number of Songs
              </label>
              <input
                type="text"
                name="songCount"
                id="songCount"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 file:rounded-md file:border-0 focus:outline-none focus:ring-1 focus:ring-slate-500"
                value={songCount}
                onChange={handleAlbumChange}
                required
              />
            </div>
            <div>
              <label htmlFor="actors" className="block mb-2 font-medium ml-1">
                Starcast
              </label>
              <input
                type="text"
                name="actors"
                id="actors"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                value={actors}
                onChange={handleAlbumChange}
                required
              />
            </div>
            <div>
              <label htmlFor="director" className="block mb-2 font-medium ml-1">
                Director
              </label>
              <input
                type="text"
                name="director"
                id="director"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                value={director}
                onChange={handleAlbumChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="thumbnailAlbum"
                className="block mb-2 font-medium ml-1"
              >
                Album Thumbnail
              </label>
              <input
                type="file"
                name="thumbnailAlbum"
                id="thumbnailAlbum"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 file:rounded-sm file:border-0 cursor-pointer file:cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-500"
                onChange={handleAlbumThumbnailChange}
                required
              />
              {thumbnailAlbumPreview && (
                <img
                  src={thumbnailAlbumPreview}
                  alt="Album Thumbnail"
                  className="w-32 h-32 mt-2 rounded-md"
                />
              )}
            </div>
          </section>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center">Add Songs</h2>
            {songsList.map((song, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg space-y-3 mt-4"
              >
                <div className="text-xl font-bold text-slate-200 ml-1">
                  <h1>Song - {index + 1}</h1>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="songName"
                      className="block mb-2 font-medium ml-1"
                    >
                      Song Name
                    </label>
                    <input
                      type="text"
                      name="songName"
                      id="songName"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                      value={song.songName}
                      onChange={(e) => handleSongChange(index, e)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="singers"
                      className="block mb-2 font-medium ml-1"
                    >
                      Singer(s)
                    </label>
                    <input
                      type="text"
                      name="singers"
                      id="singers"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                      value={song.singers}
                      onChange={(e) => handleSongChange(index, e)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lyricists"
                      className="block mb-2 font-medium ml-1"
                    >
                      Lyricists
                    </label>
                    <input
                      type="text"
                      name="lyricists"
                      id="lyricists"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                      value={song.lyricists}
                      onChange={(e) => handleSongChange(index, e)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="musicDirector"
                      className="block mb-2 font-medium ml-1"
                    >
                      Music Director
                    </label>
                    <input
                      type="text"
                      name="musicDirector"
                      id="musicDirector"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                      value={song.musicDirector}
                      onChange={(e) => handleSongChange(index, e)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="thumbnailSong"
                      className="block mb-2 font-medium ml-1"
                    >
                      Song Thumbnail
                    </label>
                    <input
                      type="file"
                      name="thumbnailSong"
                      id="thumbnailSong"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 file:rounded-sm file:border-0 cursor-pointer file:cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-500"
                      onChange={(e) => handleSongThumbnailChange(index, e)}
                      required
                    />
                    {song.thumbnailPreview && (
                      <img
                        src={song.thumbnailPreview}
                        alt="Song Thumbnail"
                        className="w-16 h-16 mt-2 rounded-md"
                      />
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="songFile"
                      className="block mb-2 font-medium ml-1"
                    >
                      Upload Song
                    </label>
                    <input
                      type="file"
                      name="songFile"
                      id="songFile"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 file:rounded-sm file:border-0 cursor-pointer file:cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-500"
                      onChange={(e) => handleSongFileChange(index, e)}
                      required
                    />
                    {song.songPreview && (
                      <audio
                        controls
                        className="mt-2 w-1/2 bg-slate-300 border border-gray-600 rounded-md p-2"
                      >
                        <source src={song.songPreview} type="audio/mp3" />
                      </audio>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={addSong}
                    className="bg-green-600 px-4 py-2 rounded-md flex items-center gap-1"
                  >
                    <span>Add Song</span>
                    <span className="mt-1">
                      <IoMdAddCircle />
                    </span>
                  </button>
                  {songsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSong(index)}
                      className="bg-red-600 px-4 py-2 rounded-md flex items-center gap-1"
                    >
                      <span>Remove Song</span>
                      <span className="mt-1">
                        <IoIosRemoveCircle />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {uploadProgress.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Uploading Songs...</h3>
              {uploadProgress.map((progress, index) => (
                <div key={index} className="w-full bg-gray-600 rounded-lg">
                  <div
                    className="bg-blue-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded-lg"
                    style={{ width: `${progress}%` }}
                  >
                    {progress}%
                  </div>
                </div>
              ))}
            </div>
          )}

          <button className="w-full py-2 px-4 bg-purple-600 hover:bg-green-600 rounded-md font-medium focus:outline-none">
            {isLoading ? "Uploading.." : "Add Album"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateAlbum;
