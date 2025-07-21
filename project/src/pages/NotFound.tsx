import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, TrendingUp } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            PropPulse AI
          </span>
        </Link>

        {/* 404 Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-8xl font-bold text-gray-300 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          <div className="space-y-4">
            <Link
              to="/dashboard"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Home size={20} />
              <span>Go to Dashboard</span>
            </Link>

            <Link
              to="/"
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-sm text-gray-500">
          <p className="mb-2">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/analytics" className="text-blue-600 hover:text-blue-700">Analytics</Link>
            <Link to="/valuation" className="text-blue-600 hover:text-blue-700">Valuation</Link>
            <Link to="/reports" className="text-blue-600 hover:text-blue-700">Reports</Link>
            <Link to="/map" className="text-blue-600 hover:text-blue-700">Property Map</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;