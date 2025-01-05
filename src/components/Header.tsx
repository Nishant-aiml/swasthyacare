import React, { useState } from 'react';
import { Menu, User as UserIcon, LogOut, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsPanel from './Notifications/NotificationsPanel';
import { useAuth } from '../lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { path: '/emergency', label: 'Emergency', className: 'text-red-600 hover:text-red-700' },
    { path: '/medicines', label: 'Medicines', className: 'text-gray-700 hover:text-gray-900' },
    { path: '/appointments', label: 'Appointments', className: 'text-gray-700 hover:text-gray-900' },
    { path: '/health-ai', label: 'Health AI', className: 'text-gray-700 hover:text-gray-900' },
    { path: '/resources', label: 'Resources', className: 'text-gray-700 hover:text-gray-900' },
    { path: '/fun-zone', label: 'Fun Zone', className: 'text-gray-700 hover:text-gray-900' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="h-2 bg-emerald-500"></div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 bg-purple-500">
                  <AvatarImage src="/logo.png" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-purple-600 text-xl font-bold leading-none">Swasthya</span>
                  <span className="text-gray-600 text-xs">by Shrinu</span>
                </div>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${link.className} px-3 py-2 font-medium flex items-center space-x-2`}
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side - Notifications, Profile, and Logout */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NotificationsPanel />
            
            {/* Desktop Profile and Logout */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/profile" className="p-2 rounded-full text-gray-500 hover:text-gray-700">
                <UserIcon className="h-6 w-6" />
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
            
            {/* Mobile Profile */}
            <div className="md:hidden flex items-center">
              <Link to="/profile" className="p-2 rounded-full text-gray-500 hover:text-gray-700">
                <UserIcon className="h-6 w-6" />
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:hidden fixed inset-0 top-[64px] bg-white z-[100] overflow-y-auto`}
        >
          <div className="p-4 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${link.className} block px-4 py-3 rounded-lg font-medium`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Logout Button (Mobile) */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center w-full space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>

            {/* Language selector */}
            <div className="pt-4 border-t border-gray-200">
              <select className="w-full p-2 border rounded-lg text-gray-700">
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}