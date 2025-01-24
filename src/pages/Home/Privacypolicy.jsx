import React from 'react';
import { FaShieldAlt, FaUser, FaLock, FaCookieBite, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#d9d9d9] rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-4"><FaShieldAlt className="inline mr-2" />Information Collected</h2>

        <h3 className="text-lg font-semibold text-blue-600 mb-2"><FaUser className="inline mr-2" />1. Voluntarily Submitted Information</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal Data: Name, gender, contact details, education, employment</li>
          <li>Payment Data: Bank details, card information</li>
          <li>Testimonials and success stories</li>
          <li>Customer support interactions</li>
          <li>Chat messages and shared content</li>
        </ul>

        <h3 className="text-lg font-semibold text-blue-600 mt-4 mb-2"><FaLock className="inline mr-2" />2. Automatically Collected Information</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>User activity on platform</li>
          <li>Device information</li>
          <li>IP address and browser details</li>
        </ul>

        <h3 className="text-lg font-semibold text-blue-600 mt-4 mb-2"><FaUser className="inline mr-2" />3. Third-Party Information</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Social media login data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-4"><FaShieldAlt className="inline mr-2" />How Information is Used</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide matchmaking services</li>
          <li>Account management</li>
          <li>Customer support</li>
          <li>Research and analysis</li>
          <li>Match recommendations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-4"><FaShieldAlt className="inline mr-2" />Information Sharing</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>With other users</li>
          <li>Service providers and partners</li>
          <li>Law enforcement agencies when required</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-4"><FaLock className="inline mr-2" />User Rights</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access personal information</li>
          <li>Correct or delete information</li>
          <li>Withdraw consent</li>
          <li>Opt-out of third-party sharing</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-4"><FaShieldAlt className="inline mr-2" />Data Security</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Encryption of sensitive data</li>
          <li>Restricted employee access</li>
          <li>Adherence to industry standards</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-4"><FaCookieBite className="inline mr-2" />Cookies Policy</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>First-party and third-party cookies used</li>
          <li>Purposes: Improving services, understanding usage</li>
          <li>Can be managed through browser settings</li>
        </ul>
      </section>

      <footer className="text-center text-gray-600 mt-8">
        <p><FaEnvelope className="inline mr-2" />Contact: info@famly.com for any privacy-related queries</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
