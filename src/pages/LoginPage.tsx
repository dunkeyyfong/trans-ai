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

  const API_URL = import.meta.env.VITE_API_URL
  const ADMIN_URL = import.meta.env.VITE_ADMIN_URL

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

      localStorage.setItem("token", data.token);

      const decodedToken = jwtDecode<DecodedToken>(data.token);

      if (decodedToken.role === "ADMIN") {
        window.open(`${ADMIN_URL}/home?accessToken=${data.token}`);
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
    <div className="flex justify-center items-center min-h-screen px-6 mx-[16%]">
      

      <div className="bg-white p-12 w-[500px] lg:w-[600px] text-center">
        <h2 className="text-4xl font-bold mb-10">Log In</h2>

        {error && <p className="text-red-500 text-lg mb-3">{error}</p>}
        {message && <p className="text-green-500 text-lg mb-3">{message}</p>}

        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border rounded-xl mb-5 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border rounded-xl mb-5 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            onClick={handleLogin}
            className="w-full bg-emerald-600 mb-10 text-white py-4 text-xl font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-emerald-700 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </div>

        <div className="text-lg py-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-600 font-bold text-xl">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
