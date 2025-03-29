import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleRegister = async () => {
    setError("");

    if (password !== confirmPassword) {
      
        notification.error({
        message: "Register Failed",
        description:
        "Passwords do not match",
        duration: 2,
      });
      return;
    }

    if (!agreeToTerms) {
      
      notification.error({
        message: "Register Failed",
        description:
        "You must agree to the terms to continue.",
        duration: 2,
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        let errorMessage = "Login failed";
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          notification.error({
            message: "Register Failed",
            description:
            errorMessage,
            duration: 2,
          });
      }

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/verify-email");
    } catch (err) {
      if (err instanceof Error) {
        
        notification.error({
          message: "Register Failed",
          description:
          err.message,
          duration: 2,
        });

      } else {
        
        notification.error({
          message: "Register Failed",
          description:
          "An unknown error occurred",
          duration: 2,
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white p-8 w-full max-w-md text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Sign Up
        </h2>

        {error && <p className="text-red-500 text-lg mb-3">{error}</p>}

        <div>
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Điều khoản */}
          <div className="flex items-center mb-4 text-left">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 w-5 h-5 cursor-pointer"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the
              <Link to="/terms" className="text-emerald-600 underline mx-1">
                Terms of Use
              </Link>
              and
              <Link to="/privacy" className="text-emerald-600 underline mx-1">
                Privacy Policy
              </Link>.
            </label>
          </div>

          {/* Nút đăng ký */}
          <button
            onClick={handleRegister}
            className={`w-full py-3 rounded-lg text-white text-lg font-semibold transition duration-300 ${
              agreeToTerms
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!agreeToTerms}
          >
            Sign Up
          </button>
        </div>

        {/* Điều hướng đến trang đăng nhập */}
        <div className="text-lg py-4">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 font-bold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
