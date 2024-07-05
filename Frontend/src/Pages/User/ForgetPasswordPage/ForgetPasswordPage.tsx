import ForgetPassword from "../../../Components/User/ForgetPassword/ForgetPassword"


const ForgetPasswordPage = () => {
  return (
    <div className="flex justify-between h-screen m-2">
      <div className="w-1/2">
        <img
          className=" h-3/4 object-cover mt-14 rounded-xl"
          src="../../../Images/forgot-password.png"
          alt=""
        />
      </div>

      <div className="flex items-center justify-center w-1/2">
        <ForgetPassword/>
      </div>
    </div>
  )
}

export default ForgetPasswordPage