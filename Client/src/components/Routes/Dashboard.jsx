import React, { useEffect } from "react";
import Header from "../Header";
import KeyStats from "../KeyStats";
import { useAuth } from "../AuthProvider";
import Chart from "../Chart";
import PieChart from "../PieChart";

const Dashboard = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    document.title = "Dashboard - Planify";
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full">
      <Header />

      <h2 className="text-2xl font-bold pt-6 pb-4 px-4 bg-gray-100">
        Welcome, <span className="text-indigo-600">{user?.name}</span>
      </h2>

      <div className="bg-gray-100 p-4 min-h-screen">
        <KeyStats />
        <div className="flex flex-col 2xl:flex-row gap-5 mt-10">
          <Chart />
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
