import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms to continue.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8085/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/verify-email");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-6 mx-[16%]">
      {/* Hình ảnh */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center h-full">
          <img
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
            alt="Img Register"
            className="max-w-xl lg:max-w-2xl"
          />
        </div>
      </div>

      {/* Đăng ký */}
      <div className="bg-white p-12 w-[500px] lg:w-[600px] text-center">
        <h2 className="text-4xl font-bold mb-10">Sign Up</h2>

        {error && <p className="text-red-500 text-lg mb-3">{error}</p>}

        <div>
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 border rounded-xl mb-5 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border rounded-xl mb-5 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border rounded-xl mb-5 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-4 border rounded-xl mb-4 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Điều khoản */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="text-base text-gray-600">
              I agree to the
              <Link to="/terms" className="text-emerald-600 underline"> Terms of Use </Link>
              and
              <Link to="/privacy" className="text-emerald-600 underline"> Privacy Policy</Link>.
            </label>
          </div>

          {/* Nút đăng ký */}
          <button
            onClick={handleRegister}
            className={`w-full py-4 rounded-xl text-white text-xl font-semibold ${
              agreeToTerms ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!agreeToTerms}
          >
            Sign Up
          </button>
        </div>

        {/* Điều hướng đến trang đăng nhập */}
        <div className="mt-6 text-lg bg-slate-100 py-4">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 font-bold text-xl">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
