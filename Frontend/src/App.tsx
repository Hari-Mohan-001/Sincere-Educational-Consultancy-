import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignUpPage from "./Pages/User/SignUpPage/SignUpPage"
import SignInPage from "./Pages/User/SignInPage/SignInPage"
import OtpVerifyPage from "./Pages/User/OtpVerifyPage/OtpVerifyPage"
import ForgetPasswordPage from "./Pages/User/ForgetPasswordPage/ForgetPasswordPage"
import ResetPasswordPage from "./Pages/User/ResetPasswordPage/ResetPasswordPage"


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
     <Route path="/signUp" element={<SignUpPage/>}/>
     <Route path="/signIn" element={<SignInPage/>}/>
     <Route path="/verifyOtp" element={<OtpVerifyPage/>}/>
     <Route path="/forgetPassword" element={<ForgetPasswordPage/>}/>  
     <Route path="/resetPassword" element={<ResetPasswordPage/>}/>   
    </Routes>
    </BrowserRouter>
  )
}

export default App
