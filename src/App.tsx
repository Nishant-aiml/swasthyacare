import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Emergency from './pages/Emergency';
import EmergencyChat from './components/Emergency/EmergencyChat';
import AppointmentPage from './pages/appointments';
import Medicines from './pages/Medicines';
import HealthAI from './pages/HealthAI';
import { AuthProvider } from './context/AuthContext';

// Protected Route wrapper component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Login />
        } 
      />
      
      <Route 
        path="/register" 
        element={
          isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Register />
        } 
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/emergency"
        element={
          <ProtectedRoute>
            <Emergency />
          </ProtectedRoute>
        }
      />

      <Route
        path="/emergency-chat"
        element={
          <ProtectedRoute>
            <EmergencyChat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <AppointmentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/medicines"
        element={
          <ProtectedRoute>
            <Medicines />
          </ProtectedRoute>
        }
      />

      <Route
        path="/health-ai"
        element={
          <ProtectedRoute>
            <HealthAI />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to login if not authenticated, otherwise to dashboard */}
      <Route 
        path="*" 
        element={
          isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <AppRoutes />
          <Footer />
          <Toaster richColors position="top-center" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
