import React from "react";
import { Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import CodeBlockPage from "./pages/CodeBlockPage";
import "./styles/styles.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/codeblocks/:id" element={<CodeBlockPage />} />
      </Routes>
    </div>
  );
}

export default App;
