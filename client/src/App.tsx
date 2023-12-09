import { useState } from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Chat } from "./components/Chat";

function App() {
  const userToken = localStorage.getItem("token");

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {userToken ? (
            <Route path="/home" element={<Chat />} />
          ) : (
            <Navigate to="/login" replace />
          )}
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
