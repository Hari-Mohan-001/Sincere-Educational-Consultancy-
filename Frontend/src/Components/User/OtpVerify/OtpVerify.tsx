import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../../Redux/User/UserSlice";
import { AppDispatch } from "../../../Redux/Store";
import { ResponseData, RootState } from "../../../Interface/User/UserInterface";

const OtpVerify = () => {

  const navigate = useNavigate()
  const {user} = useSelector((state:RootState)=>state.user)

  useEffect(()=>{
    if(user){
      console.log(user);
      
      navigate("/home")
    }
  },[user, navigate])
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setOtp(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!otp) {
      setError("Enter the otp to proceed");
      return
    }
    dispatch(verifyOtp(otp)).then((result) => {
      if (verifyOtp.fulfilled.match(result)) {
        navigate("/signIn");
      } else if (verifyOtp.rejected.match(result)) {
        const payload = result.payload as ResponseData;
        setError(payload?.message || "Otp verification failed");
      }
    });
  };
  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-center text-2xl">Enter the otp to signup</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Enter your otp</Typography>
            <TextField
              id="otp"
              label="otp"
              fullWidth
              variant="outlined"
              size="small"
              value={otp}
              onChange={handleChange}
            />
          </Box>
          {error && <p className="text-red-700">{error}</p>}

          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default OtpVerify;
