import { createContext, useState, useRef, useEffect } from "react";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaForward,
  FaBackward,
  FaRedo,
  FaVolumeUp,
} from "react-icons/fa";
import { RiLoopLeftLine } from "react-icons/ri";
import { FaVolumeMute } from "react-icons/fa";

export const AudioContext = createContext(null);

const AudioContextProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio());
  const songsQueue = useRef([]);
  const currentIndex = useRef(0);

  //! Function to play a song
  const playSong = (song, songList = []) => {
    if (currentSong?.id !== song.id) {
      audioRef.current.pause();
      audioRef.current.src = song.url;
      setCurrentSong(song);
      setIsPlaying(true);
      audioRef.current.play();

      songsQueue.current = songList;
      currentIndex.current = songList.findIndex((s) => s.id === song.id);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  //! Function to pause song
  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  //! Function to go forward (next song)
  const playNext = () => {
    if (songsQueue.current.length > 0) {
      const nextIndex = (currentIndex.current + 1) % songsQueue.current.length;
      playSong(songsQueue.current[nextIndex], songsQueue.current);
    }
  };

  //! Function to go backward (previous song)
  const playPrevious = () => {
    if (songsQueue.current.length > 0) {
      const prevIndex =
        currentIndex.current === 0
          ? songsQueue.current.length - 1
          : currentIndex.current - 1;
      playSong(songsQueue.current[prevIndex], songsQueue.current);
    }
  };

  //! Function to toggle loop
  const toggleLoop = () => {
    setIsLooping(!isLooping);
    audioRef.current.loop = !isLooping;
  };

  //! Toggle Mute/Unmute
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    audioRef.current.muted = !isMuted;
  };

  //! Update progress bar as song plays
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current.duration) {
        setProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
      }
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("ended", playNext);
    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
      audioRef.current.removeEventListener("ended", playNext);
    };
  }, []);

  //! Seek functionality when user moves the slider
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  //! Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        pauseSong,
        playNext,
        playPrevious,
        toggleLoop,
      }}
    >
      {children}

      {currentSong && (
        <div className="fixed z-10 bottom-0 left-0 w-full bg-gray-900 text-white p-4 grid grid-cols-3 items-center">
          <div className="flex items-center gap-4">
            <img
              src={currentSong.thumbnailSong}
              className="w-16 h-14 rounded-md"
              alt="Song Thumbnail"
            />
            <div className="flex flex-col">
              <h3 className="text-lg">{currentSong.name}</h3>
              <p className="text-sm text-gray-400">{currentSong.singers}</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6">
            <button
              onClick={playPrevious}
              className="text-xl"
              title="Previous Song"
            >
              <FaBackward />
            </button>
            <button
              onClick={
                isPlaying
                  ? pauseSong
                  : () => playSong(currentSong, songsQueue.current)
              }
              className="text-3xl"
              title="Play/Pause"
            >
              {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
            </button>
            <button onClick={playNext} className="text-xl" title="Next Song">
              <FaForward />
            </button>
          </div>

          <div className="flex justify-end items-center gap-4">
            <button
              onClick={toggleLoop}
              title="Loop"
              className={`text-xl ${isLooping ? "text-green-400" : ""}`}
            >
              <RiLoopLeftLine />
            </button>
            <button onClick={toggleMute} className="text-xl" title="Volume">
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20"
            />
          </div>
          <div className="flex justify-center items-center gap-2 w-full col-span-2 md:col-span-3 mt-2">
            <span className="text-sm text-gray-400">
              {formatTime(audioRef.current?.currentTime || 0)}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 rounded-lg cursor-pointer mx-2 accent-rose-600"
            />
            <span className="text-sm text-gray-400">
              {formatTime(audioRef.current?.duration || 0)}
            </span>
          </div>
        </div>
      )}
    </AudioContext.Provider>
  );
};

export default AudioContextProvider;
