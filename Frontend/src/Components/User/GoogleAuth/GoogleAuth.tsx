import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../../Firebase/FirebaseConfig";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { googleAuth } from "../../../Redux/User/UserSlice";
import { AppDispatch } from "../../../Redux/Store";
import { useNavigate } from "react-router-dom";
import { ResponseData } from "../../../Interface/User/UserInterface";
import { toast } from "react-toastify";
const GoogleAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      console.log('go frnt');
      
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      if (result) {
        const userData = {
          name: result.user.displayName ?? "",
          email: result.user.email ?? "",
          image: result.user.photoURL ?? "",
          mobile: result.user.phoneNumber ?? "",
        };
        dispatch(googleAuth(userData)).then((result) => {
          if (googleAuth.fulfilled.match(result)) {
            toast.success("Login Successfull")
            navigate("/home");
          } else if (googleAuth.rejected.match(result)) {
            const payload = result.payload as ResponseData;
            toast.error(payload.message || "Failed to login");
          }
        });
      } 
    } catch (e) {
      console.log(e);
      
    }
  };
  return (
    // <button
    //   onClick={handleClick}
    //   type="button"
    //   className=" uppercase bg-green-700 text-white rounded-lg p-3 hover:opacity-90"
    // >
    //   continue with google
    // </button>
    <Button
      type="submit"
      variant="contained"
      className="uppercase w-full !bg-green-700"
      onClick={handleClick}
    >
      Continue with google
    </Button>
  );
};

export default GoogleAuth;
