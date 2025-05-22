import React, { Suspense } from "react";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/AuthProvider";
import Layout from "./components/Layout";
import * as Lazy from "./components/lazy";
import useUserActivity from "./hooks/useUserActivity";

const App = () => {
  const { isAuthenticated } = useAuth();
  useUserActivity();

  return (
    <Suspense
      fallback={
        <div className="h-screen grid place-items-center">
          <Lazy.PreLoader />
        </div>
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? <Lazy.Home /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <Lazy.Signup /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Lazy.Login /> : <Navigate to="/dashboard" />
          }
        />
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Lazy.Dashboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/study-room"
            element={
              isAuthenticated ? <Lazy.StudyRoom /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/study-goals"
            element={
              isAuthenticated ? <Lazy.StudyGoals /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/leaderboard"
            element={
              isAuthenticated ? <Lazy.Leaderboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? <Lazy.Settings /> : <Navigate to="/login" />
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
