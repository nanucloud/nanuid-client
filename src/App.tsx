import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 페이지 컴포넌트
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import TokenInfoPage from "./pages/TokenInfoPage";
import MyPage from "./pages/MyPage";
import SecurityPage from "./pages/SecurityPage";
import MobileLoginPage from "./pages/mobile/MobileLoginPage";
import MobileRegisterPage from "./pages/mobile/MobileRegisterPage";

import ProtectedRoute from "./components/ProtectedRoute";
import MobileProtectedRoute from "./components/MobileProtectedRoute";
import { UserProfileProvider } from "./components/UserProfileContext";
import Layout from "./components/home/HomeLayout";
import ApplicationPage from "./pages/ApplicationPage";
import OAuthLoginPage from "./pages/OAuthLoginPage";

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
        {/* 웹 인증 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oauth" element={<OAuthLoginPage />} />

        {/* 모바일 인증 페이지 */}
        <Route path="/app/login" element={<MobileLoginPage />} />
        <Route path="/app/register" element={<MobileRegisterPage />} />
        
        {/* 모바일 리다이렉트 */}
        <Route
          path="/app"
          element={
            <MobileProtectedRoute>
              <Navigate to="/app/home" replace />
            </MobileProtectedRoute>
          }
        />

        {/* 메인 리다이렉트 */}
        <Route
          path="/"
          element={
            <UserProfileProvider>
              <ProtectedRoute>
                <Navigate to="/home" replace />
              </ProtectedRoute>
            </UserProfileProvider>
          }
        />

        {/* 사이드바가 포함된 메인 레이아웃 라우트 */}
        <Route
          element={
            <UserProfileProvider>
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            </UserProfileProvider>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/tokens" element={<TokenInfoPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/applications" element={<ApplicationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;