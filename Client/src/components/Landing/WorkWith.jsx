import React from "react";
import Reveal from "../Reveal";
import stanford from "../../images/stanford-university.webp";
import purple from "../../images/Purple-UO2.webp";
import aaronloeb from "../../images/aaronloeb-university.webp";
import graduate from "../../images/Graduate-university.webp";
import oxford from "../../images/university-of-oxford.webp";

const images = [
  { name: "stanford", image: stanford },
  { name: "purple", image: purple },
  { name: "aaronloeb", image: aaronloeb },
  { name: "graduate", image: graduate },
  { name: "oxford", image: oxford },
];

const WorkWith = () => {
  return (
    <div className="bg-white pt-14 pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center text-lg/8 mb-10 font-semibold text-gray-900">
            Trusted by the world's most innovative study universities
          </h2>
        </Reveal>
        <Reveal>
          <div
            className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 
          sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
          >
            {images.map((item) => {
              return (
                <img
                  key={item.name}
                  src={item.image}
                  alt={item.name}
                  className="col-span-2 w-full object-contain lg:col-span-1"
                  width={158}
                  height={48}
                  loading="lazy"
                />
              );
            })}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default WorkWith;
