import { useState } from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";

function App() {
  const userToken = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
