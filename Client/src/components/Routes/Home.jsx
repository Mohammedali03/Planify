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

const Home = () => {
  return (
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
        <Footer />
      </main>
    </div>
  );
};

export default Home;
