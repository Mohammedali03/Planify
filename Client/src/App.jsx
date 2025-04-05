import React from "react";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Routes/Home";
import Signup from "./components/Routes/Signup";
import Login from "./components/Routes/Login";
import Layout from "./components/Layout";
import Dashboard from "./components/Routes/Dashboard";
import { useAuth } from "./components/AuthProvider";
import StudyRoom from "./components/Routes/StudyRoom";
import Leaderboard from "./components/Routes/Leaderboard";
import StudyGoals from "./components/Routes/StudyGoals";
import Settings from "./components/Routes/Settings";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/study-room"
          element={isAuthenticated ? <StudyRoom /> : <Navigate to="/login" />}
        />
        <Route
          path="/study-goals"
          element={isAuthenticated ? <StudyGoals /> : <Navigate to="/login" />}
        />
        <Route
          path="/leaderboard"
          element={isAuthenticated ? <Leaderboard /> : <Navigate to="/login" />}
        />
      </Route>
      <Route
        path="settings"
        element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
