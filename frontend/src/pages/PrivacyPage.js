import React from 'react';

function PrivacyPage() {
  return (
    <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Privacy Policy for Pitchine</h1>
      <p><em>Last Updated: June 17, 2024</em></p>

      <p>
        Welcome to Pitchine. We respect your privacy and are committed to protecting your personal and proprietary data. This Privacy Policy explains what information we collect, how we use it, and your rights in relation to it.
      </p>

      <h3>1. Information We Collect</h3>
      <p>We collect the following types of information to provide and improve our services:</p>
      <ul>
        <li>
          <strong>Account Information:</strong> When you sign up using Google or email, we collect your name and email address as provided by the authentication service.
        </li>
        <li>
          <strong>Startup & Pitch Data:</strong> You provide this data directly. This includes startup names, one-line pitches, problem statements, and the full text content extracted from your uploaded pitch deck PDFs.
        </li>
        <li>
          <strong>Live Pitch Practice Data:</strong> We collect the audio recordings of your practice sessions and the resulting text transcriptions from our speech-to-text service.
        </li>
        <li>
          <strong>Service Output:</strong> We store the AI-generated analysis reports and conversation logs from your practice sessions so you can review them in your history.
        </li>
      </ul>

      <h3>2. How We Use Your Information</h3>
      <p>Your data is used exclusively to power the features of Pitchine:</p>
      <ul>
        <li>To create and manage your account.</li>
        <li>To analyze your pitch deck and generate your report.</li>
        <li>To conduct the live pitch simulation with our AI investors.</li>
        <li>To save your session history for your personal review and to track your progress.</li>
      </ul>
      <p style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>
        The most important thing to know: We will never use your pitch ideas, pitch decks, audio, or proprietary startup information to train our own AI models. Your data is used only to provide the service back to you for that specific session. It is not used for any other purpose.
      </p>

      <h3>3. How We Share Your Information</h3>
      <p>We do not sell, trade, or rent your personal information to marketers or third parties. We only share data with the essential cloud service providers that power our application:</p>
      <ul>
        <li>
          <strong>Google Cloud Platform:</strong> We send your pitch deck text and conversation transcripts to Google's Gemini API for analysis and AI responses. We send your audio to Google's Speech-to-Text API for transcription. This data is processed according to Google's privacy policy.
        </li>
        <li>
          <strong>Firebase (by Google):</strong> We use Firebase Authentication to manage your account and Firestore to store your account information and session history securely.
        </li>
        <li>
          <strong>Render:</strong> Our application servers and database are hosted on Render's secure cloud infrastructure.
        </li>
      </ul>

      <h3>4. Your Rights and Data Control</h3>
      <p>You have full control over your data:</p>
      <ul>
       
        <li>
          <strong>Deletion:</strong> You can delete your startup profiles at any time through the "Manage Profiles" feature. To request a full deletion of your account and all associated data, please contact us.
        </li>
      </ul>

      <h3>5. Data Security</h3>
      <p>
        We use industry-standard security measures to protect your data. All communication between your browser and our servers is encrypted via HTTPS and WSS (Secure WebSockets). We rely on the robust security infrastructure of our cloud partners (Google and Render) to safeguard your data at rest.
      </p>

      <h3>6. Contact Us</h3>
      <p>
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@pitchine.com " style={{color: 'var(--accent-color)'}}>hello@pitchine.com </a>.
      </p>
    </div>
  );
}

export default PrivacyPage;
