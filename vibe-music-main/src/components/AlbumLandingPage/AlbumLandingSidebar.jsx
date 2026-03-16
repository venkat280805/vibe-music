// import React, { useState } from "react";
// import {
//   FaFire,
//   FaHeart,
//   FaMusic,
//   FaBroadcastTower,
//   FaClock,
//   FaBars,
// } from "react-icons/fa";
// import { RxAvatar } from "react-icons/rx";

// const AlbumLandingSidebar = () => {
//   const [isExpanded, setIsExpanded] = useState(true);

//   return (
//     <aside
//       className={`flex flex-col sticky top-0 h-screen bg-gray-900 p-4 text-white transition-all duration-300 ${
//         isExpanded ? "w-52" : "w-16"
//       }`}
//     >
//       <button
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="flex items-center justify-center mb-4 p-2 text-lg bg-gray-800 rounded-md hover:bg-indigo-700 transition"
//       >
//         {isExpanded ? "Explore" : <FaBars />}
//       </button>

//       <nav>
//         <ul className="space-y-2">
//           <li className="group flex items-center gap-3 ">
//             <a
//               href="#popular-albums"
//               className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-rose-600 cursor-pointer transition duration-200"
//             >
//               <span className="text-lg" title="Pouplar Albums">
//                 <FaFire />
//               </span>
//               {isExpanded ? <span>Popular Albums</span> : null}
//             </a>
//           </li>
//           <li className="group flex items-center gap-3">
//             <a
//               href="#only-for-you"
//               className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-rose-600 cursor-pointer transition duration-200"
//             >
//               <span className="text-lg" title="Only for You">
//                 <FaHeart />
//               </span>
//               {isExpanded ? <span>Only for You</span> : null}
//             </a>
//           </li>
//           <li className="group flex items-center gap-3">
//             <a
//               href="#popular-artists"
//               className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-rose-600 cursor-pointer transition duration-200"
//             >
//               <span className="text-lg" title="Popular Artists">
//                 <RxAvatar />
//               </span>
//               {isExpanded ? <span>Popular Artists</span> : null}
//             </a>
//           </li>
//           <li className="group flex items-center gap-3">
//             <a
//               href="#trending-songs"
//               className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-rose-600 cursor-pointer transition duration-200"
//             >
//               <span className="text-lg" title="Trending Songs">
//                 <FaMusic />
//               </span>
//               {isExpanded ? <span>Trending Songs</span> : null}
//             </a>
//           </li>
//           {/* <li className="group flex items-center gap-3 p-2 rounded-lg hover:bg-rose-600 cursor-pointer transition duration-200">
//             <a href="#latest-releases" className="flex items-center gap-3">
//               <span className="text-lg" title="Latest Releases">
//                 <FaClock />
//               </span>
//               {isExpanded ? <span>Latest Releases</span> : null}
//             </a>
//           </li> */}
//           <li className="group flex items-center gap-3 ">
//             <a
//               href="#radio-stations"
//               className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-rose-600 cursor-pointer transition duration-200"
//             >
//               <span className="text-lg" title="Radio Stations">
//                 <FaBroadcastTower />
//               </span>
//               {isExpanded ? <span>Radio Stations</span> : null}
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default AlbumLandingSidebar;

import React, { useState } from "react";
import {
  FaFire,
  FaHeart,
  FaMusic,
  FaBroadcastTower,
  FaBars,
} from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

const AlbumLandingSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={`flex flex-col sticky top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 text-white transition-all duration-300 shadow-lg ${
        isExpanded ? "w-64" : "w-20"
      } rounded-r-xl`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center mb-6 p-3 text-xl bg-indigo-700 rounded-lg hover:bg-indigo-600 transition w-full"
      >
        {isExpanded ? "Explore" : <FaBars />}
      </button>

      <nav>
        <ul className="space-y-4">
          <li>
            <a
              href="#popular-albums"
              className="flex items-center gap-4 p-3 rounded-lg bg-gray-800 hover:bg-indigo-600 transition cursor-pointer"
            >
              <FaFire className="text-xl" />
              {isExpanded && <span className="text-lg font-semibold">Popular Albums</span>}
            </a>
          </li>
          <li>
            <a
              href="#only-for-you"
              className="flex items-center gap-4 p-3 rounded-lg bg-gray-800 hover:bg-indigo-600 transition cursor-pointer"
            >
              <FaHeart className="text-xl" />
              {isExpanded && <span className="text-lg font-semibold">Only for You</span>}
            </a>
          </li>
          <li>
            <a
              href="#popular-artists"
              className="flex items-center gap-4 p-3 rounded-lg bg-gray-800 hover:bg-indigo-600 transition cursor-pointer"
            >
              <RxAvatar className="text-xl" />
              {isExpanded && <span className="text-lg font-semibold">Popular Artists</span>}
            </a>
          </li>
          <li>
            <a
              href="#trending-songs"
              className="flex items-center gap-4 p-3 rounded-lg bg-gray-800 hover:bg-indigo-600 transition cursor-pointer"
            >
              <FaMusic className="text-xl" />
              {isExpanded && <span className="text-lg font-semibold">Trending Songs</span>}
            </a>
          </li>
          <li>
            <a
              href="#radio-stations"
              className="flex items-center gap-4 p-3 rounded-lg bg-gray-800 hover:bg-indigo-600 transition cursor-pointer"
            >
              <FaBroadcastTower className="text-xl" />
              {isExpanded && <span className="text-lg font-semibold">Radio Stations</span>}
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AlbumLandingSidebar;

