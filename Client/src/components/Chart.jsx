import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  // Sample data - replace with actual data from backend later
  const data = [
    { date: "1", time: 1800 },
    { date: "2", time: 7200 },
    { date: "3", time: 2700 },
    { date: "4", time: 5400 },
    { date: "5", time: 3600 },
    { date: "6", time: 10800 },
    { date: "7", time: 0 },
    { date: "8", time: 4500 },
    { date: "9", time: 9000 },
    { date: "10", time: 1800 },
    { date: "11", time: 3600 },
    { date: "12", time: 7200 },
    { date: "13", time: 5400 },
    { date: "14", time: 0 },
    { date: "15", time: 3600 },
    { date: "16", time: 9000 },
    { date: "17", time: 1800 },
    { date: "18", time: 7200 },
    { date: "19", time: 3600 },
    { date: "20", time: 5400 },
    { date: "21", time: 0 },
    { date: "22", time: 3600 },
    { date: "23", time: 7200 },
    { date: "24", time: 1800 },
    { date: "25", time: 9000 },
    { date: "26", time: 3600 },
    { date: "27", time: 5400 },
    { date: "28", time: 0 },
    { date: "29", time: 7200 },
    { date: "30", time: 3600 },
    { date: "31", time: 1800 },
  ];

  // Custom tooltip formatter to show time in hours, minutes, and seconds
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours === 0 && minutes === 0) return `${secs} seconds`;
    if (hours === 0) return `${minutes} min ${secs} sec`;
    if (minutes === 0)
      return `${hours} ${hours === 1 ? "hour" : "hours"} ${secs} sec`;
    return `${hours} ${
      hours === 1 ? "hour" : "hours"
    } ${minutes} min ${secs} sec`;
  };

  return (
    <div className="w-2/3 h-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mt-10">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Monthly Study Time
      </h2>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              strokeOpacity={0.3}
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickMargin={5}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(value) => formatTime(value)}
              tickMargin={5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                fontSize: "12px",
              }}
              labelStyle={{
                color: "#4b5563",
                fontWeight: "bold",
                fontSize: "12px",
              }}
              formatter={(value) => [formatTime(value), "Study Time"]}
            />
            <Bar
              dataKey="time"
              name="Study Time"
              fill="#4f46e5"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
