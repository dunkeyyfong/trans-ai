import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        if (!email) return;

        try {
            const res = await fetch("http://localhost:5000/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                navigate("/email-forgot-pass", { state: { email } });
            } else {
                setMessage(data.message || "Failed to send reset email.");
            }
        } catch {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                    Reset Your Password
                </h2>
                <p className="text-gray-600 text-center mb-6">
                    Enter the email associated with your account and we’ll send you password reset instructions.
                </p>

                {message && <p className="text-red-600 text-center mb-4">{message}</p>}

                <div className="space-y-4">
                    <label className="block text-gray-800 font-semibold">Your Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    <button
                        onClick={handleResetPassword}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        Send Reset Instructions
                    </button>
                </div>

                <div className="text-center mt-4">
                    <Link to="/login" className="text-emerald-600 hover:underline flex items-center justify-center">
                        <LeftOutlined className="mr-2" />
                        Return to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
