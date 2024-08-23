import Footer from "../../../Components/Layout/Footer"
import OtpVerify from "../../../Components/User/OtpVerify/OtpVerify"



const OtpVerifyPage = () => {
  return (
    <div className="flex justify-between h-screen m-2">
    <div className="w-1/2">
      <img
        className=" h-3/4 object-cover mt-14 rounded-xl"
        src="../../../Images/verifyOtp.webp"
        alt=""
      />
    </div>

    <div className="flex items-center justify-center w-1/2">
      <OtpVerify />
    </div>
    <Footer/>
  </div>
  )
}

export default OtpVerifyPage