// app.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Perfil from "./components/Perfil";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import React, { useState } from "react";
import Bienvenida from "./components/Bienvenida";

function App() {
  const [token, setToken] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/bienvenida" element={<Bienvenida />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/tasks" element={<Tasks token={token} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
