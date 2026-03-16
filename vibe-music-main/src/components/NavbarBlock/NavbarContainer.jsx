import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";

const NavbarContainer = () => {
  return (
    <section className="bg-[#0B0E38] h-[70px] drop-shadow-[0_5px_5px_rgba(255,255,255,0.07)] fixed top-0 w-full z-50">
      <article className="m-auto h-[70px] flex w-[90%] items-center justify-between">
        <Logo />
        <Menu />
      </article>
    </section>
  );
};

export default NavbarContainer;
