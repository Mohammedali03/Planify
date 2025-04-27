import React, { Suspense } from "react";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/AuthProvider";
import Layout from "./components/Layout";
import * as Lazy from "./components/lazy";

const App = () => {
  const { isAuthenticated } = useAuth();

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
          element={!isAuthenticated ? <Lazy.Login /> : <Navigate to="/login" />}
        />
        <Route
          path="/confirm-email"
          element={
            isAuthenticated ? <Lazy.Dashboard /> : <Lazy.ConfirmEmailPage />
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
        </Route>
        <Route
          path="/settings"
          element={
            isAuthenticated ? <Lazy.Settings /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
