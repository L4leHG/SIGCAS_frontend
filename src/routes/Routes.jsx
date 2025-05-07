import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/login";
import { Dashboard } from "../dashboard";
import Layout from "../dashboard/layout/Layout";
import Consulta from "../dashboard/consulta";

export function RoutesApp() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="consulta" element={<Consulta />} />
        {/* <Route path="tramites" element={<Tramites />} /> */}
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
