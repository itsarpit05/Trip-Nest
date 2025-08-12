import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; 


import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import HostPropertyPage from './pages/HostPropertyPage.jsx';
import MyBookingsPage from './pages/MyBookingsPage.jsx';
import PropertyDetailPage from './pages/propertyDetailPages.jsx';
import MyProfile from './pages/MyProfile.jsx';


import Header from './components/Header.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    
    <Router>
      <AuthProvider>
          <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
             <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
              />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />

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
          <Footer />
        </main>
      </div>
      </AuthProvider>
    </Router>
  );


}

export default App;