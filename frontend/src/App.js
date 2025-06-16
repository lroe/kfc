// File: frontend/src/App.js (Corrected)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, Outlet } from 'react-router-dom';
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
 * The main layout for all protected pages.
 * It includes the header with navigation and an <Outlet> to render the specific page content.
 */
function MainLayout() {
    const { currentUser, logout } = useAuth();

    return (
        <div className="App">
            <header className="app-header">
                <div className="logo">Pitchine</div>
                <nav className="main-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/deck-analyzer">Deck Analyzer</NavLink>
                    <NavLink to="/pitch-practice">Live Pitch Practice</NavLink>
                    <NavLink to="/feedback">Feedback</NavLink>
                </nav>
                <div className="user-info">
                    {currentUser && (
                        <>
                            <span>{currentUser.email}</span>
                            <button onClick={logout} className="btn btn-secondary">Logout</button>
                        </>
                    )}
                </div>
            </header>
            <main className="app-content">
                {/* The Outlet is the placeholder where child routes will be rendered */}
                <Outlet />
            </main>
        </div>
    );
}


/**
 * A wrapper for routes that require authentication.
 * If the user is not logged in, it redirects them to the login page.
 */
function PrivateRoute({ children }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />;
}

/**
 * The App component now correctly defines the route structure.
 */
function App() {
  return (
    <Routes>
        {/* Route 1: The public login page. It does NOT use the MainLayout. */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route 2: A parent route that protects and provides the MainLayout for all nested routes. */}
        <Route 
            path="/" 
            element={
                <PrivateRoute>
                    <MainLayout />
                </PrivateRoute>
            }
        >
            {/* These are the children of MainLayout. They will be rendered in the <Outlet>. */}
            
            {/* The 'index' route renders at the parent's path ('/'). This is for your HomePage. */}
            <Route index element={<HomePage />} /> 
            
            {/* Other protected pages are defined with their relative paths. */}
            <Route path="deck-analyzer" element={<DeckAnalyzerPage />} />
            <Route path="pitch-practice" element={<PitchPracticePage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            
            {/* A catch-all for any other path will redirect to the home page. */}
            <Route path="*" element={<Navigate to="/" />} />
        </Route>
    </Routes>
  );
}

/**
 * The top-level wrapper component that provides the Router and AuthContext.
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
