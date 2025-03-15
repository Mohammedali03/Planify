import React from "react";
import Header from "./Header";
import KeyStats from "./KeyStats";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <div className="bg-gray-100 p-4 min-h-screen">
        <KeyStats />
      </div>
    </div>
  );
};

export default Dashboard;
