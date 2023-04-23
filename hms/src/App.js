import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookingsPage from "./pages/BookingsPage";
import UpdatePage from "./pages/UpdatePage";
import LandingPage from "./pages/LandingPage";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/book" element={<Home />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
