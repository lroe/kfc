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
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import DeckAnalyzerPage from './pages/DeckAnalyzerPage';
import PitchPracticePage from './pages/PitchPracticePage';
import LoginPage from './pages/LoginPage';
import FeedbackPage from './pages/FeedbackPage';
import './App.css';

// --- Header Component ---
// This component contains ALL the elements for the top bar.
// This is the structure your CSS needs to create the correct layout.
function AppHeader() {
    const { currentUser, logout } = useAuth();

    // The entire header is rendered, but the content inside changes.
    // On the login page, currentUser is null, so the nav links and user info won't render.
    if (!currentUser) {
        return null; // Don't render the header at all on the login page
    }

    return (
        <header className="app-header">
            <div className="logo">Pitchine</div>
            <nav className="main-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/deck-analyzer">Deck Analyzer</NavLink>
                <NavLink to="/pitch-practice">Live Pitch Practice</NavLink>
                <NavLink to="/feedback">Feedback</NavLink>
            </nav>
            <div className="user-info">
                <span>{currentUser.email}</span>
                <button onClick={logout} className="btn btn-secondary">Logout</button>
            </div>
        </header>
    );
}

// --- ProtectedRoute Component ---
function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />;
}

// --- Main App Component ---
function App() {
  return (
    <div className="App">
        <AppHeader />
        <main className="app-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/deck-analyzer" element={<ProtectedRoute><DeckAnalyzerPage /></ProtectedRoute>} />
            <Route path="/pitch-practice" element={<ProtectedRoute><PitchPracticePage /></ProtectedRoute>} />
            <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
    </div>
  );
}

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
