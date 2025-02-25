import React from "react";

const values = [
  {
    title: "Be World-Class",
    description:
      "We strive for excellence in everything we do. From intuitive design to powerful features, we aim to deliver a world-class experience that empowers users to reach their full potential.",
  },
  {
    title: "Be Supportive",
    description:
      "We believe in creating a supportive community where learners can thrive. Whether you're struggling with a tough subject or celebrating a milestone, we're here to cheer you on every step of the way.",
  },
  {
    title: "Share Everything You Know",
    description:
      "Knowledge grows when shared. That's why we encourage users to share tips, resources, and study strategies with each other. Together, we can build a richer learning environment for everyone.",
  },
  {
    title: "Take Responsibility",
    description:
      "We take pride in being reliable and accountable. Our team is committed to providing a seamless experience, ensuring that our app is always there when you need it most.",
  },
  {
    title: "Always Learning",
    description:
      "Just like you, we're always learning and improving. We continuously update and enhance our app with new features and tools to meet the evolving needs of our users.",
  },
  {
    title: "Enjoy Downtime",
    description:
      "We understand the importance of balance. That's why we encourage users to take breaks, recharge, and enjoy their downtime. After all, a rested mind is a productive mind.",
  },
];

const About = () => {
  return (
    <section className="bg-white dark:bg-[#121212] relative isolate pt-14 pb-24 sm:pt-32 sm:pb-32 ">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:text-center text-white">
        <h2 className="max-w-2xl dark:text-white text-4xl lg:w-fit lg:m-0 lg:text-5xl text-start font-semibold text-[#101828]">
          Our Values
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-6 font-semibold text-lg lg:text-start lg:max-w-[640px]">
          At <span className="text-indigo-600">Planify</span>, we believe in
          empowering students to achieve their academic goals through
          organization, collaboration, and continuous growth. Our values guide
          everything we do, ensuring that our app helps you study smarter, not
          harder
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-10 mt-6">
          {values.map((value) => {
            return (
              <li key={value.title} className="mt-10 text-start mb-5">
                <h3 className="font-semibold dark:text-gray-300 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 mt-1 dark:text-gray-400">
                  {value.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default About;
