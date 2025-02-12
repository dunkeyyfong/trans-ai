import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
const [code, setCode] = useState("");
const [error, setError] = useState("");
const [timer, setTimer] = useState(30);
const navigate = useNavigate();

useEffect(() => {
    if (timer > 0) {
        const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }
}, [timer]);

const handleVerify = async (e: React.FormEvent) => {
e.preventDefault();
setError("");

    if (code.length !== 6) {
        setError("Please enter a valid 6-digit code.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8085/api/verify-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });

        if (!response.ok) {
            throw new Error("Invalid or expired code");
        }

        navigate("/email-verified"); // Redirect to success page
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
                src="https://img.freepik.com/premium-vector/concept-email-marketing-sending-receiving-email_199064-2345.jpg?w=996"
                alt="Verify Email"
                className="max-w-xl lg:max-w-2xl"
            />
            </div>
        </div>

        {/* Form xác thực email */}
        <div className="bg-white p-12 w-[500px] lg:w-[600px] text-center">
            <h2 className="text-4xl font-bold mb-6">Check your inbox</h2>
            <p className="text-gray-600 mb-6">
            Enter the 6-digit code we sent to <span className="font-bold">loc@gmail.com</span> to finish your login.
            </p>

            {error && <p className="text-red-500 text-lg mb-3">{error}</p>}

            <form onSubmit={handleVerify}>
                <input
                    type="text"
                    placeholder="6-digit code"
                    className="w-full px-4 py-4 border rounded-xl mb-5 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500 text-center"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-4 text-xl font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-emerald-700 transition duration-300"
                >
                    Verify Email
                </button>
            </form>

            <div className="text-gray-600 mt-6">
            Didn't receive the code?
            {timer > 0 ? (
                <span className="font-bold text-gray-500"> Resend code in {timer} sec</span>
            ) : (
                <button
                className="text-emerald-600 font-bold ml-2"
                onClick={() => setTimer(30)}
                >
                Resend code
                </button>
            )};
            </div>
        </div>
    </div>
    );
};

export default VerifyEmailPage;
