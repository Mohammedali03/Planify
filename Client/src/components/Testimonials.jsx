import React from "react";
import avatar from "../images/avatar.jpeg";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const testimonials = [
  {
    avatar: "../images/avatar.webp",
    name: "Leslie Alexander",
    username: "@lesliealexander",
    comment:
      "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
  },
  {
    avatar: "../images/avatar.webp",
    name: "Tom Cook",
    username: "@tomcook",
    comment:
      "Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.",
  },
  {
    avatar: "../images/avatar.webp",
    name: "Michael Foster",
    username: "@michaelfoster",
    comment:
      "Quia dolorem qui et. Atque quo aliquid sit eos officia. Dolores similique laboriosam quaerat cupiditate.",
  },
  {
    avatar: "../images/avatar.webp",
    name: "Whitney Francis",
    username: "@whitneyfrancis",
    comment:
      "Aliquid dolore praesentium ratione. Cumque ea officia repellendus laboriosam. Vitae adipisci ea explicabo eum sunt.",
  },
  {
    avatar: "../images/avatar.webp",
    name: "Dries Vincent",
    username: "@driesvincent",
    comment:
      "Consequatur ut atque. Itaque nostrum molestiae id veniam eos cumque. Ut quia eum fugit laborum autem inventore ut voluptate.",
  },
  {
    avatar: "../images/avatar.webp",
    name: "Leonard Krasner",
    username: "@leonardkrasner",
    comment:
      "Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.",
  },
  {
    avatar: "../images/avatar.webp",
    name: "Lindsay Walton",
    username: "@lindsaywalton",
    comment:
      "Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsum ut officia rem nulla blanditiis.",
  },
  {
    avatar: "../images/avatar.webp",
    name: "Floyd Miles",
    username: "@floydmiles",
    comment:
      "Architecto libero natus est. Est quam debitis officia enim atque et ut non. Sunt reiciendis quasi eaque. Itaque error ut et.",
  },
  {
    avatar: "../images/avatar.webp",
    name: "Courtney Henry",
    username: "@courtneyhenry",
    comment:
      "Nam nesciunt dolorem dolor asperiores cum. Incidunt molestiae quis deleniti vitae ut in earum delectus iusto.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white isolate relative mb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <Reveal>
            <h2 className="text-base/7 font-semibold text-indigo-600">
              Testimonials
            </h2>
            <p
              className="mt-2 text-4xl font-semibold
            tracking-tight text-pretty text-gray-900
            sm:text-5xl lg:text-balance"
            >
              What our amazing community says
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div
            className="mt-16 sm:mt-20 mx-auto 
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {testimonials.map((item, index) => (
              <motion.figure
                key={index}
                className="text-sm leading-6 rounded-2xl
                p-8 bg-[#f8f8f8] text-gray-900 size-fit"
                whileHover={{
                  scale: 1.05,
                  rotate: 1.5,
                  boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.12)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <blockquote className="text-gray-900 leading-7">
                  <p>"{item.comment}"</p>
                </blockquote>
                <figcaption className="flex items-center gap-6 mt-6">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="size-10 bg-[#f8f8f8] rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-gray-500">{item.username}</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
