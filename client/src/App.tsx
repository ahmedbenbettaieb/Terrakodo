import { useState } from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";
import AllTasks from "./components/AllTasks";
import AddTask from "./components/AddTask";
import ModifyTask from "./components/ModifyTask";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/all-tasks" element={<AllTasks />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/modify-task/:id" element={<ModifyTask />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
