import Header from "../../../Components/User/Header/Header";
import SignInForm from "../../../Components/User/SignInForm/SignInForm";


const SignInPage = () => {
  return (
    <>
    <Header/>
    <div className="flex justify-between h-screen m-2">
      <div className="hidden md:block md:w-1/2">
        <img
          className=" h-3/4 object-cover mt-14 rounded-xl"
          src="../../../Images/career-choice-luck-or-logic.jpg"
          alt=""
        />
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2">
        <SignInForm />
      </div>
    </div>
    </>
  );
};

export default SignInPage;
