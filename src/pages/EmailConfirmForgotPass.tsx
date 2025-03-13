import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";

const EmailConfirmForgotPass = () => {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 w-full max-w-md text-center">
                <MailOutlined className="text-emerald-600 text-6xl mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Check Your Email
                </h2>
                <p className="text-gray-600 mb-6">
                    We have sent password reset instructions to you
                    Please check your inbox and follow the link to reset your password.
                </p>

                <Link to="/login">
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition duration-300">
                        Return to Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default EmailConfirmForgotPass;
