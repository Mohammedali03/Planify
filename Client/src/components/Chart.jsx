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
import { useFetch } from "../Hooks/useFetch";

const Chart = () => {
  // Sample data - replace with actual data from backend later
  // const data = [
  //   { date: "1", month: "April", time: 1800 },
  //   { date: "2", month: "April", time: 7200 },
  //   { date: "3", month: "April", time: 2700 },
  //   { date: "4", month: "April", time: 5400 },
  //   { date: "5", month: "April", time: 3600 },
  //   { date: "6", month: "April", time: 10800 },
  //   { date: "7", month: "April", time: 0 },
  //   { date: "8", month: "April", time: 4500 },
  //   { date: "9", month: "April", time: 9000 },
  //   { date: "10", month: "April", time: 1800 },
  //   { date: "11", month: "April", time: 3600 },
  //   { date: "12", month: "April", time: 7200 },
  //   { date: "13", month: "April", time: 5400 },
  //   { date: "14", month: "April", time: 0 },
  //   { date: "15", month: "April", time: 3600 },
  //   { date: "16", month: "April", time: 9000 },
  //   { date: "17", month: "April", time: 16000 },
  //   { date: "18", month: "April", time: 7200 },
  //   { date: "19", month: "April", time: 3600 },
  //   { date: "20", month: "April", time: 5400 },
  //   { date: "21", month: "April", time: 0 },
  //   { date: "22", month: "April", time: 3600 },
  //   { date: "23", month: "April", time: 7200 },
  //   { date: "24", month: "April", time: 1800 },
  //   { date: "25", month: "April", time: 9000 },
  //   { date: "26", month: "April", time: 3600 },
  //   { date: "27", month: "April", time: 5400 },
  //   { date: "28", month: "April", time: 0 },
  //   { date: "29", month: "April", time: 7200 },
  //   { date: "30", month: "April", time: 12000 },
  //   { date: "31", month: "April", time: 1800 },
  // ];

  const { data, isLoading } = useFetch(
    "http://localhost:8000/api/stats/last_30_days_study_data"
  );

  // Custom tooltip formatter to show time in hours, minutes, and seconds
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} ${hours === 1 ? "hour" : "hours"}`;
    return `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} min`;
  };

  return (
    <div className="w-2/3 h-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 ">
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
              interval={0}
              ticks={[0, 3600, 7200, 10800, 14400, 18000, 21600]}
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
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return `${payload[0].payload.month} ${label}`;
                }
                return label;
              }}
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
