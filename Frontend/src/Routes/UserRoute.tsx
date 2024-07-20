import { Route, Routes } from "react-router-dom";
import SignUpPage from "../Pages/User/SignUpPage/SignUpPage";
import SignInPage from "../Pages/User/SignInPage/SignInPage";
import OtpVerifyPage from "../Pages/User/OtpVerifyPage/OtpVerifyPage";
import ForgetPasswordPage from "../Pages/User/ForgetPasswordPage/ForgetPasswordPage";
import ResetPasswordPage from "../Pages/User/ResetPasswordPage/ResetPasswordPage";
import HomePage from "../Pages/User/HomePage/HomePage";
import UserPrivateRoute from "./PrivateRoute";
import CoursesPage from "../Pages/User/suggestedCoursesPage/SuggestedCoursesPage";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/verifyOtp" element={<OtpVerifyPage />} />
      <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
      <Route path="/reset-Password" element={<ResetPasswordPage />} />
      <Route element={<UserPrivateRoute/>}>
      <Route path="/home" element={<HomePage />} />
      </Route>
      <Route path="/courses" element={<CoursesPage/>}/>
    </Routes>
  );
};

export default UserRoute;
