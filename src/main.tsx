// main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './app/signup/signup';
import LoginPage from './app/login/login';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import Dashboard from './app/dashboard/dashboard.tsx';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* ...other routes */}
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
);