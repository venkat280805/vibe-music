import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { __DB } from "../../backend/firebase";
import Spinner from "../../helpers/Spinner";
import PopularAlbums from "./PopularAlbums";
import RandomSongs from "./RandomSongs";
import CustomAudioPlayer from "./CustomAudioPlayer";
import PopularArtists from "./PopularArtists";
import TrendingSongs from "./TrendingSongs";

const AlbumLandingContent = () => {
  const [albums, setAlbums] = useState(null);
  const [randomSongs, setRandomSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  let [isExpanded, setIsExpanded] = useState(false);

  //! Fetch albums and extract songs
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        let albumCollection = collection(__DB, "albums");
        let getAlbums = await getDocs(albumCollection);

        let albumData = getAlbums.docs.map((album) => ({
          ...album.data(),
          id: album.id,
          songs: album.data().songs || [],
        }));
        setAlbums(albumData);

        let allSongs = albumData.flatMap((album) =>
          album.songs.map((song) => ({ ...song, albumId: album.id }))
        );
        //! Shuffiling the songs
        let shuffleSongs = allSongs
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);
        setRandomSongs(shuffleSongs);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  //! Handle play/pause
  const handlePlayPause = (song, index) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <section className="bg-slate-800 w-full">
      {albums === null ? <Spinner /> : <PopularAlbums albums={albums} />}
      {randomSongs.length === 0 ? (
        <Spinner />
      ) : (
        <RandomSongs songs={randomSongs} handlePlayPause={handlePlayPause} />
      )}
      {albums && <PopularArtists albums={albums} />}
      {albums && (
        <TrendingSongs songs={randomSongs} handlePlayPause={handlePlayPause} />
      )}
      {currentSong && (
        <CustomAudioPlayer
          audioSrc={currentSong.url}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          handlePlayPause={handlePlayPause}
          length={randomSongs.length}
          index={currentIndex}
          songs={randomSongs}
        />
      )}
    </section>
  );
};

export default AlbumLandingContent;

