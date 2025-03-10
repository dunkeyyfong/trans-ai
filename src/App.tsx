import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MarketingPage from "./pages/MarketingPage";
import NotFoundPage from "./pages/NotFoundPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import EmailVerifiedPage from "./pages/EmailVerifiedPage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import EmailConfirmForgotPass from "./pages/EmailConfirmForgotPass";
import ResetPassword from "./pages/ResetPassword";
import { useEffect} from "react";

const App = () => {

  useEffect(() => {
    if (sessionStorage.getItem("visited")) return;
    const count = localStorage.getItem("visitCount");
    let newCount = count ? parseInt(count, 10) + 1 : 1;
    if (isNaN(newCount)) {
      newCount = 1;
    }

    localStorage.setItem("visitCount", newCount.toString());
    sessionStorage.setItem("visited", "true");
    console.log(`Số lượt truy cập: ${newCount}`);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/email-verified" element={<EmailVerifiedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-forgot-pass" element={<EmailConfirmForgotPass />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<MarketingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
