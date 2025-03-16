import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  id: number;
  email: string;
  role: string;
  isActive: boolean;
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

  const handleLogin = async () => {
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      localStorage.setItem("user", JSON.stringify(data));

      const decodedToken = jwtDecode<DecodedToken>(data.accessToken);

      if (decodedToken.role === "ADMIN") {
        window.open(`${ADMIN_URL}/home?accessToken=${data.accessToken}`);
      } else {
        navigate("/home");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
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

        {error && <p className="text-red-500 text-lg mb-3">{error}</p>}
        {message && <p className="text-green-500 text-lg mb-3">{message}</p>}

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
            <Link to="/forgot-password" className="hover:text-emerald-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className={`w-full bg-emerald-600 text-white py-3 text-lg font-semibold rounded-lg flex items-center justify-center gap-3 transition duration-300 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-emerald-700"
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
