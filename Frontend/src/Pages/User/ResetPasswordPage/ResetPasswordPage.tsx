
import ResetPassword from '../../../Components/User/ResetPassword/ResetPassword'

const ResetPasswordPage = () => {
  return (
    <div className="flex justify-between h-screen m-2">
    <div className="w-1/2">
      <img
        className=" h-3/4 object-cover mt-14 rounded-xl"
        src="../../../Images/reset-password.webp"
        alt=""
      />
    </div>

    <div className="flex items-center justify-center w-1/2">
      <ResetPassword />
    </div>
  </div>
  )
}

export default ResetPasswordPage