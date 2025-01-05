import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, Pill, AlertCircle, Calendar, User, Menu, X, BookOpen, Sparkles, Sun, Moon, LogOut } from 'lucide-react';
import { useColorMode } from '../hooks/useColorMode';
import NotificationCenter from './Notifications/NotificationCenter';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-purple-100 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-1 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-md">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  Swasthya
                </span>
                <span className="text-[10px] sm:text-xs text-purple-600">by Shrinu</span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/emergency"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Emergency
                  </Link>
                  <Link
                    to="/medicines"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                  >
                    <Pill className="h-4 w-4" />
                    Medicines
                  </Link>
                  <Link
                    to="/appointments"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    Appointments
                  </Link>
                  <Link
                    to="/health-ai"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-violet-700 hover:bg-violet-50 hover:text-violet-800 transition-colors"
                  >
                    <Brain className="h-4 w-4" />
                    Health AI
                  </Link>
                  <Link
                    to="/resources"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-orange-700 hover:bg-orange-50 hover:text-orange-800 transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    Resources
                  </Link>
                  <Link
                    to="/funzone"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-pink-700 hover:bg-pink-50 hover:text-pink-800 transition-colors"
                  >
                    <Sparkles className="h-4 w-4" />
                    Fun Zone
                  </Link>
                  <div className="flex items-center gap-2 ml-4">
                    <NotificationCenter />
                    <button
                      onClick={toggleColorMode}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="Toggle color mode"
                    >
                      {colorMode === 'dark' ? (
                        <Sun className="h-5 w-5 text-yellow-600" />
                      ) : (
                        <Moon className="h-5 w-5 text-blue-600" />
                      )}
                    </button>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </>
              ) : null}
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center gap-3">
              {isAuthenticated && (
                <>
                  <NotificationCenter />
                  <button
                    onClick={toggleColorMode}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Toggle color mode"
                  >
                    {colorMode === 'dark' ? (
                      <Sun className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <Moon className="h-5 w-5 text-blue-600" />
                    )}
                  </button>
                </>
              )}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && isAuthenticated && (
        <div className="lg:hidden absolute top-16 left-0 right-0 z-50">
          <div className="mx-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="py-2">
              <Link
                to="/emergency"
                className="flex items-center gap-3 px-4 py-2.5 text-red-700 hover:bg-red-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Emergency</span>
              </Link>
              <Link
                to="/medicines"
                className="flex items-center gap-3 px-4 py-2.5 text-emerald-700 hover:bg-emerald-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <Pill className="h-5 w-5" />
                <span className="font-medium">Medicines</span>
              </Link>
              <Link
                to="/appointments"
                className="flex items-center gap-3 px-4 py-2.5 text-blue-700 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Appointments</span>
              </Link>
              <Link
                to="/health-ai"
                className="flex items-center gap-3 px-4 py-2.5 text-violet-700 hover:bg-violet-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <Brain className="h-5 w-5" />
                <span className="font-medium">Health AI</span>
              </Link>
              <Link
                to="/resources"
                className="flex items-center gap-3 px-4 py-2.5 text-orange-700 hover:bg-orange-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-5 w-5" />
                <span className="font-medium">Resources</span>
              </Link>
              <Link
                to="/funzone"
                className="flex items-center gap-3 px-4 py-2.5 text-pink-700 hover:bg-pink-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Fun Zone</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Profile</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
