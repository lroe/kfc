// File: frontend/src/pages/FeedbackPage.js

import React, { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

// This function can be moved to a shared utils file if you have one
const getBackendURLs = () => {
    const isProduction = window.location.hostname !== 'localhost';
    const prodApiUrl = "https://pitchine-api.onrender.com";
    const devApiUrl = "http://localhost:8000";
    return { apiUrl: isProduction ? prodApiUrl : devApiUrl };
};

const { apiUrl } = getBackendURLs();

function FeedbackPage() {
    const { currentUser } = useAuth();
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [message, setMessage] = useState('');

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (feedback.length < 10) {
            setStatus('error');
            setMessage('Please provide at least 10 characters of feedback.');
            return;
        }

        setStatus('submitting');
        setMessage('');

        try {
            const token = await currentUser.getIdToken();
            const response = await fetch(`${apiUrl}/api/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ text: feedback }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to submit feedback.');
            }

            setStatus('success');
            setMessage('Thank you! Your feedback has been sent.');
            setFeedback('');

        } catch (error) {
            setStatus('error');
            setMessage(error.message || 'An unexpected error occurred. Please try again.');
        }

    }, [feedback, currentUser]);

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Submit Feedback</h1>
                <p>Have an idea, suggestion, or bug report? We'd love to hear it!</p>
            </header>

            <div className="content-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="feedbackText">Your Feedback:</label>
                        <textarea
                            id="feedbackText"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="e.g., 'I wish the pitch timer was adjustable...' or 'I found a bug on the report page...'"
                            rows="8"
                            required
                            minLength="10"
                            maxLength="5000"
                            disabled={status === 'submitting'}
                        />
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button type="submit" className="btn" disabled={status === 'submitting'}>
                            {status === 'submitting' ? 'Submitting...' : 'Send Feedback'}
                        </button>
                    </div>
                </form>

                {message && (
                    <div
                        id="status"
                        className={status === 'error' ? 'error' : 'success'}
                        style={{ marginTop: '20px', textAlign: 'center' }}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeedbackPage;
