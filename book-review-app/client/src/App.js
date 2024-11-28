import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import './App.css';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </Router>
  );
};

export default App;
