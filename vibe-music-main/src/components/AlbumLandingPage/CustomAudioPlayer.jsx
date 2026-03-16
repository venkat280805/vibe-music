import React, { useEffect, useRef, useState } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";

const CustomAudioPlayer = ({
  audioSrc,
  isPlaying,
  onPlayPause,
  handlePlayPause,
  length,
  index,
  songs,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  //! Effect to update audio source and reset state when song changes
  useEffect(() => {
    if (!audioSrc) return;

    audioRef.current.src = audioSrc;
    audioRef.current.load();
    setCurrentTime(0);
    setDuration(0);

    const updateTime = () => setCurrentTime(audioRef.current.currentTime);
    const setMetadata = () => setDuration(audioRef.current.duration || 0);

    audioRef.current.addEventListener("loadedmetadata", setMetadata);
    audioRef.current.addEventListener("timeupdate", updateTime);
    audioRef.current.addEventListener("ended", handleForward);

    if (isPlaying) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.removeEventListener("loadedmetadata", setMetadata);
      audioRef.current.removeEventListener("timeupdate", updateTime);
      audioRef.current.removeEventListener("ended", handleForward);
      audioRef.current.pause();
    };
  }, [audioSrc]);

  //! Effect to handle play/pause state
  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  //! Handle forward (next song)
  const handleForward = () => {
    const nextIndex = (index + 1) % length;
    handlePlayPause(songs[nextIndex], nextIndex);
  };

  //! Handle backward (previous song)
  const handleBackward = () => {
    const prevIndex = index === 0 ? length - 1 : index - 1;
    handlePlayPause(songs[prevIndex], prevIndex);
  };

  //! Handle Seek
  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <section className="h-[90px] w-full bg-slate-800">
      <article className="px-6 py-3">
        <header>
          <form className="flex items-center justify-center gap-8 text-lg">
            <span>
              {Math.floor(currentTime / 60)}:
              {String(Math.floor(currentTime % 60)).padStart(2, "0")}
            </span>
            <input
              type="range"
              className="w-full"
              min="0"
              max={duration || 1}
              value={currentTime}
              onChange={handleSeekChange}
            />
            <span>
              {Math.floor(duration / 60)}:
              {String(Math.floor(duration % 60)).padStart(2, "0")}
            </span>
          </form>
        </header>
        <main className="w-[30%] m-auto mt-3">
          <div className="flex justify-center gap-8 text-xl">
            <span onClick={handleBackward} className="cursor-pointer">
              <FaBackward />
            </span>
            <span onClick={onPlayPause} className="cursor-pointer">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </span>
            <span onClick={handleForward} className="cursor-pointer">
              <FaForward />
            </span>
          </div>
        </main>
      </article>
    </section>
  );
};

export default CustomAudioPlayer;
