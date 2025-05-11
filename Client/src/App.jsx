import React, { Suspense } from "react";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/AuthProvider";
import Layout from "./components/Layout";
import * as Lazy from "./components/lazy";
import useUserActivity from "./hooks/useUserActivity";
import ProtectedRoute from "./components/ProtectedRoute";
import UnverifiedRedirect from "./components/UnverifiedRedirect";

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
        {/* Public Routes */}
        <Route
          path="/"
          element={
            !isAuthenticated ? <Lazy.Home /> : <Navigate to="/dashboard" />
          }
        />
        <Route element={<UnverifiedRedirect />}>
          <Route path="/signup" element={<Lazy.Signup />} />
          <Route path="/login" element={<Lazy.Login />} />
        </Route>

        {/* Confirm Email */}
        <Route
          path="/confirm-email"
          element={
            isAuthenticated ? (
              <Lazy.ConfirmEmailPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Protected Routes (Authenticated & Verified Only) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Lazy.Dashboard />} />
            <Route path="/study-room" element={<Lazy.StudyRoom />} />
            <Route path="/study-goals" element={<Lazy.StudyGoals />} />
            <Route path="/leaderboard" element={<Lazy.Leaderboard />} />
            <Route path="/settings" element={<Lazy.Settings />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
