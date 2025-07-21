import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  BarChart3, 
  Calculator, 
  FileText, 
  Map, 
  AlertTriangle, 
  User, 
  LogOut,
  Menu,
  X,
  TrendingUp
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/analytics', icon: BarChart3, label: 'AI Analytics' },
    { path: '/valuation', icon: Calculator, label: 'Valuation' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/map', icon: Map, label: 'Property Map' },
    { path: '/riskmap', icon: AlertTriangle, label: 'Risk Map' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent hidden sm:block">
                PropPulse AI
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <span className="hidden md:block text-sm text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-2 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white shadow-sm w-64 min-h-screen transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static z-30`}>
          <nav className="mt-4 lg:mt-8 px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={18} className="lg:w-5 lg:h-5" />
                      <span className="font-medium text-sm lg:text-base">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;