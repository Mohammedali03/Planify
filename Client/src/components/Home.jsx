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
        <Features />
        <Stats />
        <Banner />
        <About />
        <WorkWith />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
