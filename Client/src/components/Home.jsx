import NavBar from "./NavBar";
import Hero from "./Hero";
import Features from "./Features";
import Stats from "./Stats";
import Banner from "./Banner";
import About from "./About";
import WorkWith from "./WorkWith";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Footer from "./Footer";

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
