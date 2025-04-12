import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const studentsPerPage = 10;

  // Extended sample data with more details
  const students = [
    {
      id: 1,
      name: "John Doe",
      studyTime: "120",
      rank: 1,
      streak: 15,
      avatar: "👨‍💻",
      category: "Computer Science",
    },
    {
      id: 2,
      name: "Jane Smith",
      studyTime: "110",
      rank: 2,
      streak: 12,
      avatar: "👩‍🔬",
      category: "Biology",
    },
    {
      id: 3,
      name: "Alice Johnson",
      studyTime: "100",
      rank: 3,
      streak: 10,
      avatar: "👩‍🏫",
      category: "Mathematics",
    },
    {
      id: 4,
      name: "Bob Brown",
      studyTime: "95",
      rank: 4,
      streak: 8,
      avatar: "👨‍🔧",
      category: "Engineering",
    },
    {
      id: 5,
      name: "Charlie Davis",
      studyTime: "90",
      rank: 5,
      streak: 7,
      avatar: "👨‍🎨",
      category: "Art",
    },
    {
      id: 6,
      name: "Eva Wilson",
      studyTime: "85",
      rank: 6,
      streak: 6,
      avatar: "👩‍💼",
      category: "Business",
    },
    {
      id: 7,
      name: "Frank Miller",
      studyTime: "80",
      rank: 7,
      streak: 5,
      avatar: "👨‍⚕️",
      category: "Medicine",
    },
    {
      id: 8,
      name: "Grace Lee",
      studyTime: "75",
      rank: 8,
      streak: 4,
      avatar: "👩‍⚖️",
      category: "Law",
    },
    {
      id: 9,
      name: "Henry Taylor",
      studyTime: "70",
      rank: 9,
      streak: 3,
      avatar: "👨‍🏭",
      category: "Engineering",
    },
    {
      id: 10,
      name: "Ivy Chen",
      studyTime: "65",
      rank: 10,
      streak: 2,
      avatar: "👩‍🎓",
      category: "Computer Science",
    },
  ];

  useEffect(() => {
    document.title = "Leaderboard - Planify";
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400";
      case 3:
        return "bg-gradient-to-r from-amber-500 to-amber-700";
      default:
        return "bg-gray-100 text-indigo-600";
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

  // Filter and search logic
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || student.category === filter;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const categories = [
    "all",
    ...new Set(students.map((student) => student.category)),
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-indigo-600">
                Leaderboard
              </h1>
              <p className="text-gray-600 mt-1">
                Top performers based on study hours
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="relative">
                <select
                  className="appearance-none pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <FiFilter className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {currentStudents.map((student) => (
                <motion.div
                  key={student.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center
                          text-indigo-600 ${getRankColor(student.rank)}`}
                      >
                        <span className="text-2xl font-bold text-white">
                          {getRankEmoji(student.rank)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{student.avatar}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {student.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {student.category}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Study Time</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {student.studyTime}h
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Streak</p>
                        <p className="text-lg font-bold text-green-600">
                          {student.streak} days
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
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
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Leaderboard;
