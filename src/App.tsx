import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
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
import { UserProfileProvider } from "./components/UserProfileContext";

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
        {/* 기본 경로: UserProfileProvider와 ProtectedRoute로 감싸서 인증 후 /home으로 리다이렉트 */}
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

        {/* 인증 없이 접근 가능한 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 모바일 관련 페이지 */}
        <Route path="/app/login" element={<MobileLoginPage />} />
        <Route path="/app/register" element={<MobileRegisterPage />} />
        <Route
          path="/app"
          element={
            <MobileProtectedRoute>
              <Navigate to="/app/home" replace />
            </MobileProtectedRoute>
          }
        />

        {/* 인증이 필요한 페이지들을 하나의 그룹으로 묶음 */}
        <Route
          element={
            <UserProfileProvider>
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            </UserProfileProvider>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/tokens" element={<TokenInfoPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/info" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
