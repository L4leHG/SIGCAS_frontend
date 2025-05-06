import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/login";
import { Dashboard } from "../dashboard";

export function RoutesApp() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/dashboard"
        element={
        //   <PrivateRoute>
            <Dashboard />
        //   </PrivateRoute>
        }
      ></Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
