import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { notification } from "antd";

interface DecodedToken extends JwtPayload {
  id: number;
  email: string;
  role: string;
  isActive: boolean;
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

  const handleLogin = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = "Login failed";
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          notification.error({
            message: "Login Failed",
            description:
            errorMessage,
            duration: 2,
          });

        } 

      const data = await response.json();

      // Decode token
      const decodedToken = jwtDecode<DecodedToken>(data.accessToken);

      notification.success({
        message: "Login Successful",
        description: `Welcome back, ${decodedToken.email}!`,
        duration: 2,
      });

      // Redirect based on role
      if (decodedToken.role === "ADMIN") {
        window.open(`${ADMIN_URL}/home?accessToken=${data.accessToken}`);
      } else {
        await localStorage.setItem("user", JSON.stringify(data));
        navigate("/home");
      }
    } catch (err) {
      notification.error({
        message: "Login Failed",
        description:
          err instanceof Error ? err.message : "An unknown error occurred",
        duration: 2,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white p-8 w-full max-w-md text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Log In
        </h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="hover:text-emerald-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className={`w-full bg-emerald-600 text-white py-3 text-lg font-semibold rounded-lg flex items-center justify-center gap-3 transition duration-300 ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-emerald-700"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </div>

        <div className="text-lg py-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-600 font-bold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;