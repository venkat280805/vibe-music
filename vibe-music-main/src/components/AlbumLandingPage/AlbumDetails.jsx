import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import Equalizer from "./equalizer-gif.gif";
import toast from "react-hot-toast";
import { AudioContext } from "../context/AudioContextApi";
import { AuthContext } from "../context/AuthContextApi";

const AlbumDetails = () => {
  const albumData = useLocation();
  const { authUser } = useContext(AuthContext);
  const { album, songs } = albumData.state || {};

  console.log("Album:", album);
  console.log("Songs:", songs);

  //! Access Global Audio Player
  const { currentSong, isPlaying, playSong, pauseSong } =
    useContext(AudioContext);

  //! Handle PlayPause
  const handlePlayPause = (song, index) => {
    console.log("Authuser:", authUser); 
    if (!authUser && index >= 2) {
      toast.error("Login to listen to more songs!");
      return;
    }

    if (currentSong?.id === song.id) {
      isPlaying ? pauseSong() : playSong(song, songs);
    } else {
      playSong(song, songs);
    }
  };

  if (!album) {
    return <p className="text-center text-white">Album not found</p>;
  }

  return (
    <section className="w-full p-3 bg-slate-700">
      <article className="flex gap-5 w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-slate-800 hover:bg-slate-900 hover:ring-1 hover:ring-indigo-700 text-white rounded-lg transition duration-100 ease-in p-3">
        <aside className="basis-[28%]">
          <figure className="relative py-4">
            <img
              src={album.thumbnailAlbum}
              alt={album.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <span className="absolute top-1 right-[-20px] bg-rose-700 text-white px-2 py-1 rounded">
              {album.albumType}
            </span>
          </figure>
        </aside>

        <aside className="basis-[70%] ml-2 p-3 ">
          <h1 className="text-4xl font-bold py-2 tracking-wider">
            {album.title}
          </h1>
          <p className="text-justify">
            <span className="tracking-wider font-semibold">Description: </span>
            <span className="text-gray-400">{album.description}</span>
          </p>
          <p className="mt-2">
            <span className="tracking-wider font-semibold">Language: </span>
            <span className="text-gray-400">{album.language}</span>
          </p>
          <p className="mt-2">
            <span className="tracking-wider font-semibold mr-1">
              Release Date of Movie:
            </span>
            <span className="text-gray-400">{album.dateCreated}</span>
          </p>
          <p className="mt-2">
            <span className="tracking-wider font-semibold">Release Year: </span>
            <span className="text-gray-400">{album.releaseYear}</span>
          </p>
          <p className="mt-2">
            <span className="tracking-wider font-semibold">Album Type: </span>
            <span className="text-gray-400">{album.albumType}</span>
          </p>
          <p className="mt-2">
            <span className="tracking-wider font-semibold">Starcast: </span>
            <span className="text-gray-400">{album.actors}</span>
          </p>
          <p className="mt-2">
            <span className="tracking-wider font-semibold">Director: </span>
            <span className="text-gray-400">{album.director}</span>
          </p>
          <p className="mt-2">
            <span className="tracking-wider font-semibold mr-1">
              Number of Tracks:
            </span>
            <span className="text-gray-400">{album.songCount}</span>
          </p>
        </aside>
      </article>

      <div className="mt-5 mb-40">
        <h2 className="text-3xl font-bold mb-3 ml-1">Songs List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-slate-900 text-white rounded-lg">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2">Track No</th>
                <th className="p-3">Thumbnail</th>
                <th className="p-3 text-left">Track Name</th>
                <th className="p-3 text-left">Singers</th>
                <th className="p-3 text-left">Music Director</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Size</th>
              </tr>
            </thead>
            <tbody>
              {songs && songs.length > 0 ? (
                songs.map((song, index) => (
                  <tr
                    key={index}
                    className={`group border-t border-gray-700 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-slate-900 cursor-pointer transition duration-100 ease-linear hover:ring-1 hover:ring-slate-600 ${
                      currentSong?.id === song.id && isPlaying
                        ? "bg-indigo-600"
                        : "bg-slate-900"
                    }`}
                    onClick={() => handlePlayPause(song, index)}
                  >
                    <th>{index + 1}</th>
                    <td className="p-3">
                      <div className="relative w-12 h-12 m-auto">
                        <img
                          src={song.thumbnailSong}
                          alt={song.name}
                          className="w-full h-full rounded"
                        />

                        {currentSong?.id === song.id && isPlaying && (
                          <img
                            src={Equalizer}
                            alt="Playing GIF"
                            className="absolute top-1 inset-0 w-full h-full object-cover rounded"
                          />
                        )}

                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {currentSong?.id === song.id && isPlaying ? (
                            <FaPauseCircle className="text-white text-xl" />
                          ) : (
                            <FaPlayCircle className="text-white text-xl" />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{song.name}</td>
                    <td className="p-2">{song.singers}</td>
                    <td className="p-2">{song.musicDirector}</td>
                    <td className="p-2 text-center">{song.duration}</td>
                    <td className="p-2 text-center">{song.size}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-400">
                    No songs available for this album.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AlbumDetails;
