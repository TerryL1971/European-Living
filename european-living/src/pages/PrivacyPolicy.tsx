import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 prose prose-blue">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2>1. Information We Collect</h2>
      <p>
        We collect information you provide directly to us, including when you:
      </p>
      <ul>
        <li>Select your military base location</li>
        <li>Submit business reviews or recommendations</li>
        <li>Contact us for support</li>
      </ul>

      <h2>2. Cookies and Tracking</h2>
      <h3>Necessary Cookies</h3>
      <p>
        Required for the website to function properly. These include:
      </p>
      <ul>
        <li>Session management</li>
        <li>Security features</li>
        <li>Your selected military base preference</li>
      </ul>

      <h3>Analytics Cookies</h3>
      <p>
        Help us understand how visitors use our site. We use Google Analytics
        to collect anonymous usage data.
      </p>

      <h3>Marketing Cookies</h3>
      <p>
        Used to deliver personalized advertisements. You can opt-out of these
        at any time through our cookie settings.
      </p>

      <h2>3. Your Rights (GDPR)</h2>
      <p>
        Under GDPR, you have the right to:
      </p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Object to processing of your data</li>
        <li>Data portability</li>
        <li>Withdraw consent at any time</li>
      </ul>

      <h2>4. Contact Us</h2>
      <p>
        For privacy-related questions, contact us at:{' '}
        <a href="mailto:privacy@european-living.live">
          privacy@european-living.live
        </a>
      </p>
    </div>
  );
}