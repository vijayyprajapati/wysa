import logo from "./logo.svg";
import "./App.css";
import { getLocalStorage } from "./utils/localStorage";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Chat from "./pages/chat";

function App() {
  const login = getLocalStorage("login-state");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={login ? <Navigate to="/chat" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
