import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        if (password.length < 8) {
        setMessage("Password must be at least 8 characters long.");
        return;
        }

        if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
        }

        try {
        const res = await fetch("http://localhost:5000/api/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        const data = await res.json();

        if (res.ok) {
            navigate("/login");
        } else {
            setMessage(data.message || "Failed to reset password.");
        }
        } catch {
        setMessage("An error occurred. Please try again.");
        }
    };

    return (
    <div className="flex justify-center items-center min-h-screen px-4">
        <div className="bg-white p-8 w-full max-w-md text-center shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Reset Your Password</h2>
        <p className="text-gray-600 text-center mb-6">8-character minimum; case sensitive</p>

        {message && <p className="text-red-500 text-sm text-center mb-4">{message}</p>}

        <div className="space-y-4">
            <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 transition"
            />

            <input
                type="password"
                placeholder="Reenter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 transition"
            />
        </div>

        <div className="flex justify-end mt-6 space-x-3">
            <button
                onClick={() => navigate("/login")}
                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-400 transition duration-300"
            >
            Cancel
            </button>
            <button
                onClick={handleResetPassword}
                className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition duration-300"
            >
            Next
            </button>
        </div>
        </div>
    </div>
    );
};

export default ResetPassword;
