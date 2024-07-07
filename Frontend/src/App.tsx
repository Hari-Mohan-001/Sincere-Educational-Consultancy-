import { Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/User/SignUpPage/SignUpPage";
import SignInPage from "./Pages/User/SignInPage/SignInPage";
import OtpVerifyPage from "./Pages/User/OtpVerifyPage/OtpVerifyPage";
import ForgetPasswordPage from "./Pages/User/ForgetPasswordPage/ForgetPasswordPage";
import ResetPasswordPage from "./Pages/User/ResetPasswordPage/ResetPasswordPage";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/signUp" element={<SignUpPage />} />   
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/verifyOtp" element={<OtpVerifyPage />} />
      <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
      <Route path="/reset-Password" element={<ResetPasswordPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
