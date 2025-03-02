import NavBar from "./NavBar";
import Hero from "./Hero";
import Features from "./Features";
import Stats from "./Stats";
import Banner from "./Banner";
import About from "./About";
import WorkWith from "./WorkWith";
import Testimonials from "./Testimonials";
import CTA from "./CTA";

const Home = () => {
  return (
    <div className="bg-white">
      <NavBar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Banner />
        <About />
        <WorkWith />
        <Testimonials />
        <CTA />
      </main>
    </div>
  );
};

export default Home;
