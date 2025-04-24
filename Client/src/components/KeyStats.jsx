import { useState, useEffect } from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  FireIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useFetch } from "../Hooks/useFetch";

const KeyStats = () => {
  const { data, isLoading } = useFetch(
    "http://localhost:8000/api/stats/user_month_stats"
  );

  // Initialize with default values that match your data structure
  const [stats, setStats] = useState(() => [
    {
      name: "Total Study Hours",
      value: "0h 0min",
      icon: ClockIcon,
      bgColor: "bg-blue-100",
      textColor: "text-blue-500",
      borderColor: "border-blue-200",
    },
    {
      name: "Completed Goals",
      value: 0,
      icon: CheckCircleIcon,
      bgColor: "bg-green-100",
      textColor: "text-green-500",
      borderColor: "border-green-200",
    },
    {
      name: "Streak",
      value: 0,
      icon: FireIcon,
      bgColor: "bg-orange-100",
      textColor: "text-orange-500",
      borderColor: "border-orange-200",
    },
    {
      name: "Completed Sessions",
      value: 0,
      icon: EyeIcon,
      bgColor: "bg-purple-100",
      textColor: "text-purple-500",
      borderColor: "border-purple-200",
    },
  ]);

  useEffect(() => {
    if (data) {
      setStats([
        {
          name: "Total Study Hours",
          value: data.monthlyStudyTime || "0h 0m",
          icon: ClockIcon,
          bgColor: "bg-blue-100",
          textColor: "text-blue-500",
          borderColor: "border-blue-200",
        },
        {
          name: "Completed Goals",
          value: data.monthlyCompletedGoals || 0,
          icon: CheckCircleIcon,
          bgColor: "bg-green-100",
          textColor: "text-green-500",
          borderColor: "border-green-200",
        },
        {
          name: "Streak",
          value: data.monthlyStreak || 0,
          icon: FireIcon,
          bgColor: "bg-orange-100",
          textColor: "text-orange-500",
          borderColor: "border-orange-200",
        },
        {
          name: "Completed Sessions",
          value: data.monthlySessions || 0,
          icon: EyeIcon,
          bgColor: "bg-purple-100",
          textColor: "text-purple-500",
          borderColor: "border-purple-200",
        },
      ]);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className={`flex items-center p-4 ${stat.bgColor} ${stat.borderColor} border rounded-lg`}
        >
          <div className="p-2 bg-white rounded-full">
            <stat.icon className={`h-8 w-8 ${stat.textColor}`} />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-gray-700">{stat.name}</h3>
            <span className="text-lg font-bold text-gray-900">
              {stat.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyStats;
