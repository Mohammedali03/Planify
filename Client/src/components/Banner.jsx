import React from "react";
import image from "../images/banner.webp";
import Reveal from "./Reveal";

const Banner = () => {
  return (
    <div className="bg-white relative w-full py-16 sm:py-24 lg:px-8">
      <Reveal>
        <img
          src={image}
          alt="study banner"
          className="w-full lg:rounded-3xl"
          loading="lazy"
        />
      </Reveal>
    </div>
  );
};

export default Banner;
