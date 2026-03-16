import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MusicIcon from "./music-icon.png";
import ArtistJSON from "./Artists.json";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const PopularArtists = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.6;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mt-4 p-4 bg-slate-800 relative" id="popular-artists">
      <div className="w-full">
        <header className="rounded-sm border-bg-gray-400">
          <h1 className="text-2xl font-bold p-1 mt-2 mb-4 tracking-wider flex items-center">
            <span className="mr-2">
              <img src={MusicIcon} alt="Music Icon" className="h-8" />
            </span>
            Popular Artists
          </h1>
        </header>
      </div>

      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md z-10 hover:bg-gray-600"
        onClick={() => scroll("left")}
      >
        <FaChevronLeft size={20} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden scrollbar-hide scroll-smooth mt-1 ml-16 pr-10"
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
      >
        {ArtistJSON.map((artist, index) => (
          <div
            key={index}
            className="flex-none w-[220px] p-3  rounded-lg hover:bg-black/30 transition duration-200 ease-in relative group"
          >
            <img
              src={artist.artistImg}
              className="w-[200px] h-[200px] object-cover rounded-full transition duration-200 ease-linear"
              alt={artist.artistName}
            />
            <span
              onClick={() => navigate(`/artist/${artist.artistName}`)}
              className="text-2xl p-3 cursor-pointer rounded-full bg-green-500 text-black absolute top-[170px] right-[20px] opacity-0 group-hover:opacity-100 group-hover:translate-y-[-20px] transition duration-200 ease-in-out"
            >
              <FaPlay />
            </span>
            <p className="text-white mt-2 text-center">{artist.artistName}</p>
            <p className="text-white mt-2 text-center">Artist</p>
          </div>
        ))}
      </div>

      <button
        className="absolute right-6 top-1/2 translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md z-10 hover:bg-gray-600"
        onClick={() => scroll("right")}
      >
        <FaChevronRight size={20} />
      </button>
    </section>
  );
};

export default PopularArtists;
