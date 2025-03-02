import React from "react";
import stanford from "../images/stanford-university.png";
import aaronloeb from "../images/aaronloeb-university.webp";
import tuple from "../images/tupel-univeristy.webp";
import graduate from "../images/Graduate-university.jpg";
import oxford from "../images/university-of-oxford.jpg";
import Reveal from "./Reveal";

const WorkWith = () => {
  return (
    <div className="bg-white pt-14 pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center text-lg/8 font-semibold text-gray-900">
            Trusted by the world's most innovative study universities
          </h2>
        </Reveal>
        <Reveal>
          <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              alt="Stanford"
              src={stanford}
              width={158}
              height={48}
              className="col-span-2 w-full object-contain lg:col-span-1"
              loading="lazy"
            />
            <img
              alt="Reform"
              src={tuple}
              width={258}
              height={48}
              className="col-span-2 w-full object-contain lg:col-span-1"
              loading="lazy"
            />
            <img
              alt="Tuple"
              src={aaronloeb}
              width={158}
              height={48}
              className="col-span-2 w-full object-contain lg:col-span-1"
              loading="lazy"
            />
            <img
              alt="SavvyCal"
              src={graduate}
              width={158}
              height={48}
              className="col-span-2 w-full object-contain sm:col-start-2 lg:col-span-1"
              loading="lazy"
            />
            <img
              src={oxford}
              width={158}
              height={48}
              className="col-span-2 col-start-2 w-full object-contain sm:col-start-auto lg:col-span-1"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default WorkWith;
