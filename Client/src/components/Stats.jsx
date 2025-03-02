import React from "react";
import Reveal from "./Reveal";

const stats = [
  { id: 1, number: "42 million", desc: "Study sessions logged every 24 hours" },
  {
    id: 2,
    number: "119,000",
    desc: "Study plans created and successfully completed",
  },
  { id: 3, number: "46,000", desc: "New users joining our community annually" },
];

const Stats = () => {
  return (
    <section className="bg-black relative isolate py-24 sm:py-32 overflow-hidden">
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:text-center text-white">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-white text-4xl lg:w-fit lg:m-0 lg:text-5xl font-semibold text-[#101828]">
            Our mission
          </h2>
          <div className="mt-6 max-w-2xl mx-auto flex flex-col lg:m-0 lg:max-w-full lg:flex-row lg:items-center lg:justify-between ">
            <div className="mt-5 text-base/7 text-gray-400 lg:text-start lg:max-w-[640px]">
              <span className="block text-xl leading-normal font-semibold">
                At <span className="font-bold text-indigo-600">Planify</span>,
                we help students and lifelong learners stay organized, manage
                time effectively, and stay motivated. Our platform simplifies
                study management and adapts to your learning style, making it
                easier to achieve your goals.
              </span>
              <span className="block mt-10 text-gray-400">
                Whether you're preparing for exams, juggling multiple courses,
                or pursuing self-directed learning, Planify offers a range of
                tools to keep you on track. From customizable study plans and
                progress tracking to reminders and performance analytics, we
                provide everything you need to succeed.
              </span>
            </div>
            <ul className="flex flex-col gap-3 mt-7 lg:gap-0 lg:mx-auto">
              {stats.map((stat) => {
                return (
                  <li key={stat.id} className="mb-5 flex flex-col gap-4">
                    <span className="text-4xl sm:text-5xl font-semibold">
                      {stat.number}
                    </span>
                    <span className="text-base/7 text-gray-400 leading-normal">
                      {stat.desc}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Stats;
