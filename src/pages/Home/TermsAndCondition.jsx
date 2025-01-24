import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaLock, FaRegFileAlt, FaBan, FaFileSignature } from 'react-icons/fa';

const TermsAndConditions = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#d9d9d9] rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Terms and Conditions</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-2"><FaFileSignature className="inline mr-2" />1. Acceptance of Terms of Use Agreement</h2>
        <p>To use the famly Service, you must register as a member. famly is an intermediary under the Information Technology Act, 2000. By using the Site, you agree to these Terms of Use.</p>
        
        <p className="font-medium mt-4">Key points of consent include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Submitting personally identifiable information</li>
          <li>Allowing collection and processing of personal data</li>
          <li>Accepting contact from other Members</li>
        </ul>
        
        <p className="mt-4">If you object to data collection, you should not register. To withdraw consent, delete your account by emailing rtbf@famly.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-2"><FaCheckCircle className="inline mr-2" />2. Eligibility</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Must be legally competent and of marriageable age</li>
          <li>Site is for lawful marriage alliances only</li>
          <li>Must have legal capacity to enter matrimony</li>
          <li>Intended to seek a life partner, not for casual dating</li>
          <li>Commercial use is prohibited</li>
        </ul>
        
        <p className="mt-4">famly reserves the right to terminate membership for ineligibility or misrepresentation.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-2"><FaLock className="inline mr-2" />3. Account Security</h2>
        <p className="font-medium">You are responsible for:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Maintaining login credential confidentiality</li>
          <li>All activities under your account</li>
          <li>Immediately reporting unauthorized access</li>
          <li>Logging out after each session</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-2"><FaRegFileAlt className="inline mr-2" />4. Term and Termination</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Agreement is valid while using the Site</li>
          <li>You can terminate membership by deleting your profile</li>
          <li>famly can terminate access for terms violation</li>
          <li>Some agreement provisions remain effective after termination</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-2"><FaBan className="inline mr-2" />5. Non-Commercial Use</h2>
        <p>The Site is for individual members to promote personal profiles for matchmaking. Commercial use is strictly prohibited.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-2"><FaExclamationCircle className="inline mr-2" />Prohibited Content</h2>
        <p className="font-medium">Content prohibited on the site includes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Offensive or discriminatory material</li>
          <li>Harassment content</li>
          <li>Spam or unsolicited communications</li>
          <li>False or misleading information</li>
          <li>Sexually explicit or pornographic material</li>
          <li>Content exploiting minors</li>
          <li>Illegal activity instructions</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-2"><FaExclamationCircle className="inline mr-2" />Key Disclaimers</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>famly is not responsible for member interactions</li>
          <li>No guarantees of compatibility</li>
          <li>Service provided "AS-IS"</li>
          <li>Members are solely responsible for their content</li>
        </ul>
      </section>

      <footer className="text-center text-gray-600 mt-8">
        <p>By using famly, you agree to these terms. If you do not agree, do not register.</p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
