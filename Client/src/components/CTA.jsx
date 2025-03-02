import React from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const CTA = () => {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden isolate bg-gray-900 sm:px-16">
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2
            [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full 
            sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
        <Reveal>
          <div className="py-24 px-6 mx-auto text-center lg:mx-0">
            <h2 className="text-4xl md:text-5xl [text-wrap:balance] font-semibold text-balance text-white">
              Boost your productivity today
            </h2>
            <p className="mt-6 text-lg/8 text-pretty text-gray-300">
              Organize your studies and boost productivity with our app. Track
              progress and achieve goals easily. Start now!
            </p>
            <div className="mt-10">
              <Link
                to="/signup"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900
                hover:bg-gray-200 duration-300"
              >
                Get started
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default CTA;
