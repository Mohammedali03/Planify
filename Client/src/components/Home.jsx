import NavBar from "./NavBar";
import Hero from "./Hero";
import Reveal from "./Reveal";
import Features from "./Features";
import Stats from "./Stats";
import Banner from "./Banner";
import About from "./About";
import WorkWith from "./WorkWith";
import Testimonials from "./Testimonials";

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
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <WorkWith />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
      </main>
    </div>
  );
};

export default Home;
