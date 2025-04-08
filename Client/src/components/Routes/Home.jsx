import NavBar from "../Landing/NavBar";
import Hero from "../Landing/Hero";
import Features from "../Landing/Features";
import Stats from "../Landing/Stats";
import Banner from "../Landing/Banner";
import About from "../Landing/About";
import WorkWith from "../Landing/WorkWith";
import Testimonials from "../Landing/Testimonials";
import CTA from "../Landing/CTA";
import Footer from "../Landing/Footer";
import PreLoader from "../ui/PreLoader";
import { useState, useEffect } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      {loading ? (
        <div className="h-screen grid place-content-center">
          <PreLoader />
        </div>
      ) : (
        <div className="bg-white">
          <NavBar />
          <main>
            <Hero />
            <div id="features">
              <Features />
            </div>
            <div id="stats">
              <Stats />
            </div>
            <Banner />
            <div id="about">
              <About />
            </div>
            <WorkWith />
            <div id="testimonials">
              <Testimonials />
            </div>
            <CTA />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
