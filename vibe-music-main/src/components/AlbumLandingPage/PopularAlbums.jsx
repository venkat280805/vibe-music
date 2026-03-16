import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MusicIcon from "./music-icon.png";

const PopularAlbums = ({ albums }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.5;
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
    <section className="relative" id="popular-albums">
      <header className="rounded-sm border-bg-gray-400">
        <h1 className="text-2xl font-bold p-2 mt-2 ml-2 mb-4 flex items-center">
          <img src={MusicIcon} alt="Music Icon" className="h-8 mr-2" />
          Popular Albums Collection
        </h1>
      </header>

      <button
        className="absolute left-3 top-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md z-10 hover:bg-gray-600"
        onClick={() => scroll("left")}
      >
        <FaChevronLeft size={20} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden scrollbar-hide scroll-smooth mt-1 ml-16 pr-10"
      >
        {albums.map((album) => (
          <NavLink
            to={`/album-details/${album.id}/${album.title}`}
            state={{ album, songs: album.songs }}
            key={album.id}
          >
            <aside className="w-[200px] p-4 ml-4 bg-slate-900 hover:bg-slate-950 rounded-lg cursor-pointer transition duration-200 ease-linear">
              <img
                src={album.thumbnailAlbum}
                className="w-[200px] h-[200px] object-cover rounded-md hover:scale-105 transition duration-200 ease-linear"
                alt={album.title}
              />
              <h1 className="text-white text-[18px] mt-3 text-center">
                {album.title}
              </h1>
            </aside>
          </NavLink>
        ))}
      </div>

      <button
        className="absolute right-6 top-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md z-10 hover:bg-gray-600"
        onClick={() => scroll("right")}
      >
        <FaChevronRight size={20} />
      </button>
    </section>
  );
};

export default PopularAlbums;
