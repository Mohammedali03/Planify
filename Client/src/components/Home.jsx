import React from "react";

import NavBar from "./NavBar";
import Hero from "./Hero";
import Reveal from "./Reveal";
import Features from "./Features";

const Home = () => {
  return (
    <div className="bg-white">
      <NavBar />
      <Hero />
      <Reveal>
        <Features />
      </Reveal>
    </div>
  );
};

export default Home;
