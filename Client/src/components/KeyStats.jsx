import React from "react";

import {
  ClockIcon,
  CheckCircleIcon,
  FireIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Total Study Hours",
    value: "45h 30m",
    icon: ClockIcon,
    bgColor: "bg-blue-100",
    textColor: "text-blue-500",
    borderColor: "border-blue-200",
  },
  {
    name: "Completed Lessons",
    value: "12",
    icon: CheckCircleIcon,
    bgColor: "bg-green-100",
    textColor: "text-green-500",
    borderColor: "border-green-200",
  },
  {
    name: "Streak",
    value: "7 Days",
    icon: FireIcon,
    bgColor: "bg-orange-100",
    textColor: "text-orange-500",
    borderColor: "border-orange-200",
  },
  {
    name: "Focus Time",
    value: "18 Sessions",
    icon: EyeIcon,
    bgColor: "bg-purple-100",
    textColor: "text-purple-500",
    borderColor: "border-purple-200",
  },
];

const KeyStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(
        ({ name, value, icon: Icon, textColor, bgColor, borderColor }) => (
          <div
            key={name}
            className={`flex items-center p-4 ${bgColor} ${borderColor} border rounded-lg`}
          >
            <div className="p-2 bg-white rounded-full">
              <Icon className={`h-8 w-8 ${textColor}`} />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold">{name}</h3>
              <span className="text-lg font-bold">{value}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default KeyStats;
