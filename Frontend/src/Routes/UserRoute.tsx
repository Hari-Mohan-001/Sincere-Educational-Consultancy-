import { Route, Routes } from "react-router-dom";
import SignUpPage from "../Pages/User/SignUpPage/SignUpPage";
import SignInPage from "../Pages/User/SignInPage/SignInPage";
import OtpVerifyPage from "../Pages/User/OtpVerifyPage/OtpVerifyPage";
import ForgetPasswordPage from "../Pages/User/ForgetPasswordPage/ForgetPasswordPage";
import ResetPasswordPage from "../Pages/User/ResetPasswordPage/ResetPasswordPage";
import HomePage from "../Pages/User/HomePage/HomePage";
import UserPrivateRoute from "./PrivateRoute";
// import CoursesPage from "../Pages/User/suggestedCoursesPage/SuggestedCoursesPage";
import CourseDeatailsPage from "../Pages/User/CourseDetailsPage/CourseDeatailsPage";
import UniversityDetailsPage from "../Pages/User/UniversityDetailsPage/UniversityDetailsPage";
import EnrollmentPage from "../Pages/User/EnrollmentPage/EnrollmentPage";
import SuggestedCoursesPage from "../Pages/User/suggestedCoursesPage/SuggestedCoursesPage";
import CoursePage from "../Pages/User/CoursePage/CoursePage";
import EventPage from "../Pages/User/EventPage/EventPage";
import UserChatPage from "../Pages/User/UserChatPage/UserChatPage";
import OrderSuccessPage from "../Pages/User/OrderSuccessPage/OrderSuccessPage";
import UniversitiesPage from "../Pages/User/UniversitiesPage/UniversitiesPage";
import UserVideoCallPage from "../Pages/User/UserVideoCallPage/UserVideoCallPage";
import LandingPage from "../Pages/User/LandingPage/LandingPage";
import UserNotFoundPage from "../Pages/User/UserNotFoundPage/UserNotFoundPage";
import UserProfilePage from "../Pages/User/UserProfilePage/UserProfilePage";

const UserRoute = () => {
  return (
    <Routes>
       <Route path="" element={<LandingPage/>}/>
      <Route path="signUp" element={<SignUpPage />} />
      <Route path="signIn" element={<SignInPage />} />
      <Route path="verifyOtp" element={<OtpVerifyPage />} />
      <Route path="forgetPassword" element={<ForgetPasswordPage />} />
      <Route path="reset-Password" element={<ResetPasswordPage />} />
      <Route element={<UserPrivateRoute/>}>
      <Route path="home" element={<HomePage />} />
      <Route path="enrollment" element={<EnrollmentPage/>}/>
      <Route path="suggestedCourses" element={<SuggestedCoursesPage/>}/>
      <Route path="orderSuccess" element={<OrderSuccessPage/>}/>
      <Route path="events" element={<EventPage/>}/>
      <Route path="chat/:userId/:counsellorId" element={<UserChatPage/>}/>
      <Route path="join-call/:roomId" element={<UserVideoCallPage/>}/>
      <Route path="profile" element={<UserProfilePage/>}/>
      </Route>
      <Route path="courseDetails/:courseId" element={<CourseDeatailsPage/>}/>
      <Route path="courses" element={<CoursePage/>}/>
      <Route path="courses/:domainId" element={<CoursePage/>}/>
      
      <Route path="universities" element={<UniversitiesPage/>}/>
      <Route path="universityDetails" element={<UniversityDetailsPage/>}/>
      
      <Route path="*" element={<UserNotFoundPage/>}/>  
    </Routes>
  );
};

export default UserRoute;
