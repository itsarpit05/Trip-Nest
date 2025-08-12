import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // Correct path

// Import Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import HostPropertyPage from './pages/HostPropertyPage.jsx';
import MyBookingsPage from './pages/MyBookingsPage.jsx';

// Import Components
import Header from './components/Header.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    // Router should be the outermost component
    <Router>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/host-property" 
              element={
                <ProtectedRoute role="host">
                  <HostPropertyPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-bookings" 
              element={
                <ProtectedRoute>
                  <MyBookingsPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;