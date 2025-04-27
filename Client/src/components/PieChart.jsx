import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import useFetch from "../hooks/useFetch";

const PieChart = ({}) => {
  const { data, isLoading } = useFetch(
    "http://localhost:8000/api/stats/last_30_days_study_data"
  );

  // Analyze the data to categorize study sessions
  const analyzeData = (data) => {
    const categories = {
      short: { name: "Short Sessions (< 30 mins)", value: 0, color: "#4f46e5" },
      medium: {
        name: "Medium Sessions (30-60 mins)",
        value: 0,
        color: "#7c3aed",
      },
      long: { name: "Long Sessions (> 60 mins)", value: 0, color: "#a78bfa" },
    };

    data?.forEach((item) => {
      const hours = item.time / 3600;
      if (hours < 0.5) {
        categories.short.value += item.time;
      } else if (hours <= 1) {
        categories.medium.value += item.time;
      } else {
        categories.long.value += item.time;
      }
    });

    return Object.values(categories);
  };

  const pieData = analyzeData(data);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} ${hours === 1 ? "hour" : "hours"}`;
    return `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} min`;
  };

  return (
    <div className="w-full bg-white h-[400px] dark:bg-gray-800 rounded-xl shadow-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Study Time Distribution
      </h2>
      <div className="flex justify-center items-center py-4">
        <ResponsiveContainer height={300}>
          <RechartsPieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatTime(value)}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                fontSize: "12px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ marginTop: "10px" }}
              formatter={(value) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {value}
                </span>
              )}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
