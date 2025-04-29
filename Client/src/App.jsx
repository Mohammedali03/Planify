import React, { Suspense } from "react";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/AuthProvider";
import Layout from "./components/Layout";
import * as Lazy from "./components/lazy";
import useUserActivity from "./hooks/useUserActivity";

const App = () => {
  const { isAuthenticated, isVerified } = useAuth();

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
            !isAuthenticated ? (
              <Lazy.Login />
            ) : isVerified === 1 ? (
              <Navigate to="/dashboard" />
            ) : isVerified === 0 ? (
              <Navigate to="/confirm-email" />
            ) : null
          }
        />
        <Route
          path="/confirm-email"
          element={
            isAuthenticated ? (
              isVerified === 1 ? (
                <Navigate to="/dashboard" />
              ) : (
                <Lazy.ConfirmEmailPage />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                isVerified === 1 ? (
                  <Lazy.Dashboard />
                ) : (
                  <Lazy.ConfirmEmailPage />
                )
              ) : (
                <Navigate to="/login" />
              )
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
