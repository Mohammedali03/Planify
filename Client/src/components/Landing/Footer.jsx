import React from "react";
import Reveal from "../Reveal";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="py-20 px-6 max-w-xl mx-auto overflow-hiddens md:py-24 lg:px-8">
        <Reveal>
          <nav
            className="text-sm leading-6  flex text-gray-600 justify-center flex-wrap gap-x-10 gap-y-12
          -mb-6"
          >
            <Link className="duration-300 hover:text-gray-900">Features</Link>
            <Link className="duration-300 hover:text-gray-900">Stats</Link>
            <Link className="duration-300 hover:text-gray-900">About</Link>
            <Link className="duration-300 hover:text-gray-900">
              Testimonials
            </Link>
          </nav>
          <div className="mt-10 text-sm text-gray-600 text-center">
            © 2025 Planify, Inc. All rights reserved.
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
