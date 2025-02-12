import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handlePasswordlessLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8085/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // if (!response.ok) {
      //   throw new Error(data.message || "Failed to send login link");
      // }
      console.log(data);

      localStorage.setItem("token", data.token);
      navigate("/");
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
      <div className="hidden md:block">
        <div className="flex items-center justify-center h-full">
          <img
            src="https://i.pinimg.com/736x/fd/93/c0/fd93c0ee623cc3b03b16e0a771836330.jpg"
            alt="Img Login"
            className="max-w-xl lg:max-w-2xl"
          />
        </div>
      </div>

      <div className="bg-white p-12 w-[500px] lg:w-[600px] text-center">
        <h2 className="text-4xl font-bold mb-10">Log In</h2>

        {error && <p className="text-red-500 text-lg mb-3">{error}</p>}
        {message && <p className="text-green-500 text-lg mb-3">{message}</p>}

        <form onSubmit={handlePasswordlessLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-4 border rounded-xl mb-5 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-4 border rounded-xl mb-5 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 text-xl font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-emerald-700 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending... ":  "Log in"}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <div className="relative bg-white px-4 text-gray-500 text-lg">Other log in options</div>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mb-10">
          <button className="border p-4 rounded-xl hover:bg-gray-100">
            <FaGoogle className="text-red-500" size={32} />
          </button>
          <button className="border p-4 rounded-xl hover:bg-gray-100">
            <FaFacebookF className="text-blue-600" size={32} />
          </button>
          <button className="border p-4 rounded-xl hover:bg-gray-100">
            <FaApple className="text-black" size={32} />
          </button>
        </div>

        <div className="text-lg bg-slate-100 py-4">
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
