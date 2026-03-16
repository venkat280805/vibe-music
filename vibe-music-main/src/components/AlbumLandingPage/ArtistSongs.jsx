import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { AudioContext } from "../context/AudioContextApi";
import Equalizer from "./equalizer-gif.gif";
import { collection, getDocs } from "firebase/firestore";
import { __DB } from "../../backend/firebase";
import ArtistJSON from "./Artists.json";
import { MdVerified } from "react-icons/md";

const ArtistSongs = () => {
  const { artistName } = useParams();
  const { currentSong, isPlaying, playSong, pauseSong } =
    useContext(AudioContext);
  const [artistSongs, setArtistSongs] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [artistImage, setArtistImage] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const albumRef = collection(__DB, "albums");
        const albumsSnapshot = await getDocs(albumRef);
        const albums = albumsSnapshot.docs.map((doc) => doc.data());

        //! Filter songs where the artist is a singer
        const filteredSongs = albums.flatMap((album) =>
          album.songs.filter((song) => song.singers.includes(artistName))
        );

        setArtistSongs(filteredSongs);

        //! Calculate total duration
        const totalSeconds = filteredSongs.reduce((acc, song) => {
          if (!song.duration) return acc;
          const [mins, secs] = song.duration.split(":").map(Number);
          return acc + mins * 60 + (secs || 0);
        }, 0);
        setTotalDuration(totalSeconds);

        //! Artist image
        const artist = ArtistJSON.find((a) => a.artistName === artistName);
        if (artist) {
          setArtistImage(artist.artistImg);
        }
      } catch (error) {
        console.error("Error fetching artist songs:", error);
      }
    };

    fetchSongs();
  }, [artistName]);

  const formatTotalDuration = (totalSeconds) => {
    if (isNaN(totalSeconds) || totalSeconds <= 0) return "00:00:00";

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      isPlaying ? pauseSong() : playSong(song, artistSongs);
    } else {
      playSong(song, artistSongs);
    }
  };

  return (
    <section className="w-full p-3 bg-slate-700 flex flex-col items-center">
      <article className="flex w-[65vw] justify-center items-center gap-2 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-gray-800 hover:bg-slate-900 hover:ring-1 hover:ring-indigo-700 text-white rounded-lg transition duration-100 ease-in p-3">
        <aside className="basis-[28%]">
          <figure className="relative py-4 ml-5">
            <img
              src={artistImage}
              alt={artistName}
              className="w-[200px] h-[200px] object-cover rounded-full"
            />
          </figure>
        </aside>

        <aside className="basis-[50%] ml-2 p-3">
          <h1 className="flex items-center gap-2">
            <span className="text-blue-600">
              <MdVerified />
            </span>
            <span>Verified Artist</span>
          </h1>
          <h1 className="text-6xl font-bold py-2 tracking-wider">
            {artistName}
          </h1>
          <p className="mt-2">
            <span className="tracking-wider font-semibold mr-1">
              Total Songs:
            </span>
            <span className="text-gray-400">{artistSongs.length}</span>
          </p>
          <p className="mt-2">
            <span className="tracking-wider font-semibold mr-1">
              Total Duration:
            </span>
            <span className="text-gray-400">
              {formatTotalDuration(totalDuration)}
            </span>
          </p>
        </aside>
      </article>

      {artistSongs.length > 0 ? (
        <div className="grid gap-3 mt-5 w-[80vw] mb-20">
          {artistSongs.map((song, index) => (
            <div
              key={index}
              className="flex items-center bg-slate-900 p-3 rounded-md cursor-pointer hover:bg-gray-900"
              onClick={() => handlePlayPause(song)}
            >
              <img
                src={song.thumbnailSong}
                className="w-[100px] h-16 rounded-md"
                alt={song.name}
              />

              <div className="ml-4 flex-1">
                <p className="text-lg font-semibold">{song.name}</p>
                <p className="text-sm text-gray-400">Singer: {song.singers}</p>
                <p className="text-sm text-gray-400">
                  Duration: {song.duration}
                </p>
              </div>

              <div className="relative w-8 h-8">
                {currentSong?.id === song.id && isPlaying ? (
                  <img
                    src={Equalizer}
                    alt="Playing"
                    className="w-full h-full"
                  />
                ) : (
                  <FaPlayCircle size={30} />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-center text-gray-400">
          No songs found for {artistName}
        </p>
      )}
    </section>
  );
};

export default ArtistSongs;
