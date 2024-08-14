import SignUpForm from "../../../Components/User/SignUpForm/SignUpForm"


const SignUpPage = () => {
  return (
    <div className="flex justify-between h-screen m-2">
        <div className="hidden md:block md:w-1/2">
        <img className=" h-3/4 object-cover mt-14 rounded-xl" src="../../../Images/carrerimage1.jpg" alt="" />
        </div>
        <div className="flex items-center justify-center w-full md:w-1/2">
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUpPage