import React from "react";
import MusicLogo from "./vibe.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <aside className="logo">
      <figure>
        <Link to={"/"}>
          <img src={MusicLogo} alt="" width={"78"} className="w-15 rounded-full" />
        </Link>
      </figure>
    </aside>
  );
};

export default Logo;
