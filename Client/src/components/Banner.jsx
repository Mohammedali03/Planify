import React from "react";
import image from "../images/banner-image.jpg";

const Banner = () => {
  return (
    <div className="bg-white relative w-full py-24 sm:py-36 lg:px-8">
      <img
        src={image}
        alt="study banner"
        className="w-full lg:rounded-3xl"
        loading="lazy"
      />
    </div>
  );
};

export default Banner;
