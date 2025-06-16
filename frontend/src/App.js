// File: frontend/src/App.js

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation
} from 'react-router-dom';

// Import the AuthProvider and the useAuth hook
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import all page components, including the new FeedbackPage
import HomePage from './pages/HomePage';
import DeckAnalyzerPage from './pages/DeckAnalyzerPage';
import PitchPracticePage from './pages/PitchPracticePage';
import LoginPage from './pages/LoginPage';
import FeedbackPage from './pages/FeedbackPage';

// Import the main stylesheet
import './App.css';

// --- MainNav Component Definition ---
// This component matches your original structure. It displays the main
// navigation bar on every page, and uses the `currentUser` state to
// decide which links to show.
function MainNav() {
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    return (
        <header className="app-header">
            <div className="logo">Pitchine</div>
            <nav className="main-nav">
                {/* Links are only rendered if a user is logged in. On the login page,
                    currentUser is null, so these links will not appear. */}
                {currentUser && <NavLink to="/">Home</NavLink>}
                {currentUser && <NavLink to="/deck-analyzer">Deck Analyzer</NavLink>}
                {currentUser && <NavLink to="/pitch-practice">Live Pitch Practice</NavLink>}
                {currentUser && <NavLink to="/feedback">Feedback</NavLink>}
            </nav>
            <div className="user-info">
                {currentUser ? (
                    <>
                        <span>{currentUser.email}</span>
                        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                    </>
                ) : (
                    // This section is empty on the login page, preserving its simple style.
                    null
                )}
            </div>
        </header>
    );
}

// --- ProtectedRoute Component Definition ---
// This is the exact wrapper component from your working code.
function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    const location = useLocation();

    if (!currentUser) {
        // If the user is not logged in, redirect to the /login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If the user is logged in, render the child component
    return children;
}


// --- Main App Component ---
// This component now defines the routes within your desired structure.
function App() {
  return (
    <div className="App">
        <MainNav />
        <main className="app-content">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={<ProtectedRoute><HomePage /></ProtectedRoute>}
            />
            <Route
              path="/deck-analyzer"
              element={<ProtectedRoute><DeckAnalyzerPage /></ProtectedRoute>}
            />
            <Route
              path="/pitch-practice"
              element={<ProtectedRoute><PitchPracticePage /></ProtectedRoute>}
            />
            {/* The new feedback page route, also protected */}
            <Route
              path="/feedback"
              element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>}
            />
            
            {/* Catch-all route for any other unknown path */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
    </div>
  );
}

// This wrapper is the standard way to provide context to the whole app.
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
