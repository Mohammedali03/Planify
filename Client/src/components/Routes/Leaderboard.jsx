import React, { useState } from "react";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Extended sample data
  const students = [
    { id: 1, name: "John Doe", studyTime: "120", rank: 1 },
    { id: 2, name: "Jane Smith", studyTime: "110", rank: 2 },
    { id: 3, name: "Alice Johnson", studyTime: "100", rank: 3 },
    { id: 4, name: "Bob Brown", studyTime: "95", rank: 4 },
    { id: 5, name: "Charlie Davis", studyTime: "90", rank: 5 },
    { id: 6, name: "Eva Wilson", studyTime: "85", rank: 6 },
    { id: 7, name: "Frank Miller", studyTime: "80", rank: 7 },
    { id: 8, name: "Grace Lee", studyTime: "75", rank: 8 },
    { id: 9, name: "Henry Taylor", studyTime: "70", rank: 9 },
    { id: 10, name: "Ivy Chen", studyTime: "65", rank: 10 },
    { id: 11, name: "Jack Wilson", studyTime: "60", rank: 11 },
    { id: 12, name: "Kelly Brown", studyTime: "55", rank: 12 },
    { id: 13, name: "Liam Davis", studyTime: "50", rank: 13 },
    { id: 14, name: "Mia Johnson", studyTime: "45", rank: 14 },
    { id: 15, name: "Noah Smith", studyTime: "40", rank: 15 },
  ];

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "text-yellow-500"; // Gold
      case 2:
        return "text-gray-400"; // Silver
      case 3:
        return "text-amber-600"; // Bronze
      default:
        return "text-gray-900";
    }
  };

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1:
        return "👑";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Section with Title */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-indigo-900">Leaderboard</h1>
          <p className="text-gray-600 mt-1">
            Top performers based on study hours
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {currentStudents.map((student) => (
            <motion.div
              key={student.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <span
                    className={`text-2xl font-bold w-12 ${getRankColor(
                      student.rank
                    )}`}
                  >
                    {getRankEmoji(student.rank)}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {student.name}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Study Time</p>
                    <p className="text-lg font-bold text-indigo-600">
                      {student.studyTime}h
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } transition-colors duration-300`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Leaderboard;
