import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Valuation from './pages/Valuation';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import RiskMap from './pages/RiskMap';
import PropertyMap from './pages/PropertyMap';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/valuation" element={
                <ProtectedRoute>
                  <Valuation />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/riskmap" element={
                <ProtectedRoute>
                  <RiskMap />
                </ProtectedRoute>
              } />
              <Route path="/map" element={
                <ProtectedRoute>
                  <PropertyMap />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;