import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

// Simple Protective Route
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('admin_auth') === 'true';
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Route */}
        <Route path="/" element={<MenuPage />} />
        
        {/* Admin Login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Admin Dashboard */}
        <Route path="/admin" element={
            <ProtectedRoute>
                <AdminPage />
            </ProtectedRoute>
        } />

        {/* Catch all redirect to Customer Menu */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
