// File: frontend/src/App.js

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
 * It includes the header with navigation and an <Outlet> to render the specific page.
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
                    {currentUser ? (
                        <>
                            <span>{currentUser.email}</span>
                            <button onClick={logout} className="btn btn-secondary">Logout</button>
                        </>
                    ) : (
                        // This part is a fallback, but shouldn't be seen if PrivateRoute works
                        <NavLink to="/login" className="btn">Login</NavLink>
                    )}
                </div>
            </header>
            <main className="app-content">
                {/* The Outlet renders the matched child route component */}
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
 * The App component now just defines the routes.
 * The layout is handled by the MainLayout component.
 */
function App() {
  return (
    <Routes>
        {/* Publicly accessible login page - NO main layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* All protected routes are nested under a single private route
            that renders the MainLayout. */}
        <Route 
            path="/*" 
            element={
                <PrivateRoute>
                    <MainLayout />
                </PrivateRoute>
            }
        >
            {/* These routes are children of MainLayout and will be rendered in its <Outlet> */}
            <Route index element={<Navigate to="/" />} />
            <Route path="/" element={<HomePage />} />
            <Route path="deck-analyzer" element={<DeckAnalyzerPage />} />
            <Route path="pitch-practice" element={<PitchPracticePage />} />
            <Route path="feedback" element={<FeedbackPage />} />
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
