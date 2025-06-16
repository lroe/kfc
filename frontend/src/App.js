// File: frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import all page components
import HomePage from './pages/HomePage';
import DeckAnalyzerPage from './pages/DeckAnalyzerPage';
import PitchPracticePage from './pages/PitchPracticePage';
import LoginPage from './pages/LoginPage';
import FeedbackPage from './pages/FeedbackPage';

// Import the main stylesheet
import './App.css';

/**
 * A wrapper for routes that require authentication.
 * If the user is not logged in, it redirects them to the login page.
 */
function PrivateRoute({ children }) {
    const { currentUser } = useAuth();
    // If there is a user, render the child component (the protected page)
    // Otherwise, redirect to the /login page
    return currentUser ? children : <Navigate to="/login" />;
}

/**
 * The main application component that holds the layout and routing logic.
 */
function App() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="App">
      <header className="app-header">
        <div className="logo">Pitchine</div>
        
        {/* Main navigation is only shown to logged-in users */}
        {currentUser && (
          <nav className="main-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/deck-analyzer">Deck Analyzer</NavLink>
            <NavLink to="/pitch-practice">Live Pitch Practice</NavLink>
            <NavLink to="/feedback">Feedback</NavLink>
          </nav>
        )}
        
        <div className="user-info">
            {currentUser ? (
              <>
                {/* Display user's email and a logout button if logged in */}
                <span>{currentUser.email}</span>
                <button onClick={logout} className="btn btn-secondary">Logout</button>
              </>
            ) : (
                // Display a login button if not logged in
                <NavLink to="/login" className="btn">Login</NavLink>
            )}
        </div>
      </header>
      
      <main className="app-content">
        <Routes>
          {/* Publicly accessible login page */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          {/* Each protected route is wrapped in the PrivateRoute component */}
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/deck-analyzer" element={<PrivateRoute><DeckAnalyzerPage /></PrivateRoute>} />
          <Route path="/pitch-practice" element={<PrivateRoute><PitchPracticePage /></PrivateRoute>} />
          <Route path="/feedback" element={<PrivateRoute><FeedbackPage /></PrivateRoute>} />
          
          {/* A fallback route to redirect any stray root access to the home page */}
          <Route index element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

/**
 * The top-level wrapper component that provides the Router and AuthContext
 * to the entire application. This is the component you'll render in index.js.
 */
function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;
