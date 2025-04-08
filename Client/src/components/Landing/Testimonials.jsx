import { useRef } from "react";
import avatar from "../../images/avatar.jpeg";
import { motion, useInView } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    avatar: "../images/avatar.webp",
    name: "Leslie Alexander",
    username: "@lesliealexander",
    comment:
      "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
    rating: 5,
  },
  {
    avatar: "../images/avatar.webp",
    name: "Tom Cook",
    username: "@tomcook",
    comment:
      "Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.",
    rating: 5,
  },
  {
    avatar: "../images/avatar.webp",
    name: "Michael Foster",
    username: "@michaelfoster",
    comment:
      "Quia dolorem qui et. Atque quo aliquid sit eos officia. Dolores similique laboriosam quaerat cupiditate.",
    rating: 5,
  },
  {
    avatar: "../images/avatar.webp",
    name: "Whitney Francis",
    username: "@whitneyfrancis",
    comment:
      "Aliquid dolore praesentium ratione. Cumque ea officia repellendus laboriosam. Vitae adipisci ea explicabo eum sunt.",
    rating: 5,
  },
  {
    avatar: "../images/avatar.webp",
    name: "Dries Vincent",
    username: "@driesvincent",
    comment:
      "Consequatur ut atque. Itaque nostrum molestiae id veniam eos cumque. Ut quia eum fugit laborum autem inventore ut voluptate.",
    rating: 5,
  },
  {
    avatar: "../images/avatar.webp",
    name: "Leonard Krasner",
    username: "@leonardkrasner",
    comment:
      "Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.",
    rating: 5,
  },
  {
    avatar: "../images/avatar.webp",
    name: "Lindsay Walton",
    username: "@lindsaywalton",
    comment:
      "Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsum ut officia rem nulla blanditiis.",
    rating: 4,
  },
  {
    avatar: "../images/avatar.webp",
    name: "Floyd Miles",
    username: "@floydmiles",
    comment:
      "Architecto libero natus est. Est quam debitis officia enim atque et ut non. Sunt reiciendis quasi eaque. Itaque error ut et.",
    rating: 4,
  },
  {
    avatar: "../images/avatar.webp",
    name: "Courtney Henry",
    username: "@courtneyhenry",
    comment:
      "Nam nesciunt dolorem dolor asperiores cum. Incidunt molestiae quis deleniti vitae ut in earum delectus iusto.",
    rating: 4,
  },
];

const Testimonials = () => {
  const testimonialsRef = useRef(null);
  const isInView = useInView(testimonialsRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="bg-white isolate relative mb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl lg:text-center"
        >
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
        </motion.div>

        <motion.div
          ref={testimonialsRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 sm:mt-20 mx-auto 
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((item, index) => (
            <motion.figure
              key={index}
              variants={itemVariants}
              className="text-sm leading-6 rounded-2xl
                p-8 bg-[#f8f8f8] text-gray-900 size-fit relative
                hover:bg-white transition-colors duration-300
                border border-gray-100"
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.08)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <div className="flex mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-900 leading-7">
                <p>&ldquo;{item.comment}&rdquo;</p>
              </blockquote>
              <figcaption className="flex items-center gap-6 mt-6">
                <motion.img
                  src={avatar}
                  alt="avatar"
                  className="size-10 bg-[#f8f8f8] rounded-full"
                  loading="lazy"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
                <div>
                  <div className="font-semibold text-gray-900">{item.name}</div>
                  <div className="text-gray-500">{item.username}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
