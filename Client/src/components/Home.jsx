import React from "react";

import NavBar from "./NavBar";
import Hero from "./Hero";
import Reveal from "./Reveal";
import Features from "./Features";
import Stats from "./Stats";
import Banner from "./Banner";

const Home = () => {
  return (
    <div className="bg-white">
      <NavBar />
      <main>
        <Hero />
        <Reveal>
          <Features />
        </Reveal>
        <Reveal>
          <Stats />
        </Reveal>
        <Reveal>
          <Banner />
        </Reveal>
      </main>
    </div>
  );
};

export default Home;
