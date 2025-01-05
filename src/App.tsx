import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Resources from './pages/Resources';
import Funzone from './pages/Funzone';
import { AuthProvider } from './context/AuthContext';
import { DailyHealthTrivia } from '@/components/Games/DailyHealthTrivia';
import { RapidFireQuiz } from '@/components/Games/RapidFireQuiz';
import { WellnessWheel } from '@/components/Games/WellnessWheel';
import { PWAInstall } from './components/PWAInstall';

// Protected Route wrapper component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {children}
    </>
  );
}

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

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
        path="/emergency/chat"
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
      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        }
      />
      <Route
        path="/funzone"
        element={
          <ProtectedRoute>
            <Funzone />
          </ProtectedRoute>
        }
      />
      <Route
        path="/funzone/trivia"
        element={
          <ProtectedRoute>
            <DailyHealthTrivia />
          </ProtectedRoute>
        }
      />
      <Route
        path="/funzone/quiz"
        element={
          <ProtectedRoute>
            <RapidFireQuiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/funzone/wheel"
        element={
          <ProtectedRoute>
            <WellnessWheel />
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

function AppContent() {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const hideNavbarPaths = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 to-violet-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-violet-600 font-medium">Loading SwasthyaCare...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {shouldShowNavbar && isAuthenticated && <Navbar />}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <AppRoutes />
      </main>
      <PWAInstall />
      <Footer />
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'white',
            color: 'black',
            fontSize: '14px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
