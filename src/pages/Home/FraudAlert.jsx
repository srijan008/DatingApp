import React from 'react';
import { FaExclamationTriangle, FaShieldAlt, FaLock, FaUserShield, FaRegHandshake, FaClipboardCheck, FaSearch } from 'react-icons/fa';

const FraudAlerts = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#d9d9d9] rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Fraud Prevention Guidelines</h2>
      <ol className="space-y-4">
        <li className="flex items-start space-x-3">
          <FaExclamationTriangle className="text-yellow-500 text-2xl" />
          <div>
            <strong className="text-lg">Verify Profile Information:</strong>
            <p>If a user appears to have provided false information about education, profession, income, or family, mark the profile as 'Report Abuse' and avoid contact.</p>
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <FaShieldAlt className="text-green-500 text-2xl" />
          <div>
            <strong className="text-lg">Avoid Personal Favors:</strong>
            <p>Immediately stop communication if a user requests personal favors like transporting goods, depositing funds, or lending money.</p>
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <FaLock className="text-red-500 text-2xl" />
          <div>
            <strong className="text-lg">Beware of Fake Websites:</strong>
            <p>Only use www.famly.com. Be cautious of fraudulent sites mimicking the platform. Do not respond to requests for membership fees or registration from unknown sources.</p>
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <FaUserShield className="text-blue-500 text-2xl" />
          <div>
            <strong className="text-lg">Protect Your Account:</strong>
            <p>famly never asks for login credentials. Do not share passwords or confidential details with anyone claiming to represent the platform.</p>
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <FaShieldAlt className="text-purple-500 text-2xl" />
          <div>
            <strong className="text-lg">Secure Financial Information:</strong>
            <p>Never share bank account numbers, online banking credentials, credit card details, or financial information.</p>
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <FaRegHandshake className="text-orange-500 text-2xl" />
          <div>
            <strong className="text-lg">Safe Meetings:</strong>
            <p>Arrange meetings in public locations and inform family or friends about the meeting.</p>
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <FaClipboardCheck className="text-teal-500 text-2xl" />
          <div>
            <strong className="text-lg">Conduct Background Research:</strong>
            <p>Perform thorough background checks on potential partners before making commitments.</p>
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <FaSearch className="text-indigo-500 text-2xl" />
          <div>
            <strong className="text-lg">Independent Verification:</strong>
            <p>Users are responsible for verifying profile authenticity. famly is a preliminary contact platform.</p>
          </div>
        </li>
      </ol>
      <p className="mt-6 text-center text-gray-600">
        If you encounter suspicious profiles or activities, notify support at <a href="mailto:help@famly.com" className="text-blue-600">help@famly.com</a>
      </p>
    </div>
  );
};

export default FraudAlerts;
