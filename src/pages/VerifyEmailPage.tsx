import { useState, useEffect } from "react";

const VerifyEmailPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [timer, setTimer] = useState(30);
  const [email, setEmail] = useState("");

  const handleResendEmail = async () => {
    try {
      if (!email) {
        console.error("Email is required");
        throw new Error("Email is required");
      }

      const response = await fetch(`${API_URL}/api/resend-email`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error("Failed to resend email");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Lỗi khi gửi email:", error);
    }
  }

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setEmail(JSON.parse(userData).email || "Không có email");
      } catch (error) {
        console.error("Lỗi khi parse JSON:", error);
        setEmail("Lỗi dữ liệu");
      }
    } else {
      setEmail("Không tìm thấy user");
    }
  }, []);

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
      <h2 className="text-4xl font-bold mb-6">Please check your inbox</h2>
      <p className="text-gray-600 mb-6">
        We've sent a login link to <span className="font-bold">{email}</span>.  
        If you don't see it in your inbox, kindly check your spam or promotions folder as well.
      </p>

        <div className="text-gray-600 mt-6">
          Didn't receive the email?
          {timer > 0 ? (
            <span className="font-bold text-gray-500">
              Resend in {timer} sec
            </span>
          ) : (
            <button
              className="text-emerald-600 font-bold ml-2"
              onClick={() => {
                setTimer(30)
                handleResendEmail()
              }}
            >
              Resend code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
