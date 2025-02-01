import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MobileLoginPage from "./pages/mobile/MobileLoginPage";
import MobileRegisterPage from "./pages/mobile/MobileRegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MobileProtectedRoute from "./components/MobileProtectedRoute";
import HomePage from "./pages/HomePage";
import TokenInfoPage from "./pages/TokenInfoPage";
import MyPage from "./pages/MyPage";
import SecurityPage from "./pages/SecurityPage";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
      />
      <Routes>
        <Route path="/" element={
            <ProtectedRoute>
              <Navigate to="/home" replace />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/app" element={
            <MobileProtectedRoute>
              <Navigate to="/app/home" replace />
            </MobileProtectedRoute>
          }
        />
        <Route path="/app/login" element={<MobileLoginPage />} />
        <Route path="/app/register" element={<MobileRegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tokens" element={<TokenInfoPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/info" element={<MyPage />} />

        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
