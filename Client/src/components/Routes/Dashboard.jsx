import React, { useEffect } from "react";
import Header from "../Header";
import KeyStats from "../KeyStats";
import { useAuth } from "../AuthProvider";
import Chart from "../Chart";

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Dashboard - Planify";
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <Header />

      <h2 className="text-2xl font-bold pt-6 pb-4 px-4 bg-gray-100">
        Welcome, <span className="text-indigo-600">{user?.name}</span>
      </h2>

      <div className="bg-gray-100 p-4 min-h-screen">
        <KeyStats />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
