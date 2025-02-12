import React from "react";
import { Link } from "react-router-dom";

const EmailVerifiedPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 w-[400px] shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Email Verified Successfully 🎉</h2>
        <p className="text-lg text-gray-700 mb-6">You can now log in to your account.</p>

        <Link
          to="/login"
          className="bg-emerald-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-emerald-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default EmailVerifiedPage;
