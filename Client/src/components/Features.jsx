import React from "react";
import {
  SpeakerWaveIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
const features = [
  {
    name: "Progress tracking",
    description:
      "Visualize your study journey with detailed stats and insight, set goals, track your time and celebrate miles tones as you progress.",
    icon: ChartBarIcon,
  },
  {
    name: "Focus timer",
    description:
      "Boost productivity with custimizable timers. use the Promodo technique or set your own intervals to stay focused and take breaks effictively.",
    icon: ClockIcon,
  },
  {
    name: "Study sounds",
    description:
      "Immerse yourself in a library of calming sounds. choose from rain, white noise or coffee shop embiance to create your perfect study environment.",
    icon: SpeakerWaveIcon,
  },
  {
    name: "Task management",
    description:
      "organize your study tasks with ease. create todo lists, set priorities and got reminders to stay on top of your deadlines.",
    icon: ClipboardDocumentCheckIcon,
  },
];

const Features = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Features
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Everything you need to master your studies
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Stay organized, focused and motivated with tools designed to help
            you achieve your goals
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
