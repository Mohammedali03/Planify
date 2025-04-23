import React, { useEffect, useState } from "react";
import Header from "../Header";
import KeyStats from "../KeyStats";
import { useAuth } from "../AuthProvider";
import Chart from "../Chart";
import PieChart from "../PieChart";
import Chat from "../Chat";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [receiverId, setReceiverId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Dashboard - Planify";
  }, []);

  const copyUserId = () => {
    navigator.clipboard.writeText(user?.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full">
      <Header />

      <h2 className="text-2xl font-bold pt-6 pb-4 px-4 bg-gray-100">
        Welcome, <span className="text-indigo-600">{user?.name}</span>
      </h2>

      <div className="bg-gray-100 p-4 min-h-screen">
        <KeyStats />
        <div className="flex flex-col md:flex-row gap-5 mt-10">
          <Chart />
          <PieChart />
        </div>

        {/* Chat Section */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Chat</h3>
            <button
              onClick={() => setShowChat(!showChat)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showChat ? 'Hide Chat' : 'Show Chat'}
            </button>
          </div>

          {showChat && (
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="mb-4">
                <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Your User ID (Share this with others to chat):</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono bg-gray-100 px-3 py-1 rounded">{user?.id}</span>
                    <button
                      onClick={copyUserId}
                      className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700"
                    >
                      <ClipboardDocumentIcon className="h-4 w-4" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Enter User ID to chat with"
                  value={receiverId}
                  onChange={(e) => setReceiverId(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              {receiverId && <Chat receiverId={receiverId} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
