import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import {Divider} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../Constants/Constants";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";

const ForgetPassword = () => {

  const {user} = useSelector((state:RootState)=>state.user)
  const navigate = useNavigate()
  

  useEffect(()=>{
    if(user){
      console.log(user);
      
      navigate("/home")
    }
  },[user, navigate])

  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string>("")
  const[loading , setLoading] = useState<boolean>(false)
  const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
       setEmail(e.target.value)
       setError("")
  }

  const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            if(!email){
              setError("Email is required")
              return
             }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                 setError("Enter a valid email")
                 return
             }
             setLoading(true)
            const response = await fetch(`${BASE_URL}/request-password-reset`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({email})
            })
           const data = await response.json()
           setLoading(false)
           if(!response.ok){
            setError(data.message)
            return
           }else{
            toast.success("Reset link has been sent to mail")
            setEmail("")
           }
  }
  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
    <h1 className="text-center text-2xl">Enter the email to reset password</h1>
    <form onSubmit={handleSubmit} className="mt-4 gap-5">
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Typography variant="inherit">Enter your email id</Typography>
          <TextField
            id="email"
            label="Email"
            fullWidth
            variant="outlined"
            size="small"
            value={email}
            error={Boolean(error)}
            helperText={error}
            onChange={handleChange}
          />
        </Box>
        

        <Box display="flex" justifyContent="center">
          <Button type="submit" variant="contained">
          {loading ? <CircularProgress size={24} />:"Submit"}
          </Button>
          
        </Box>
       
      </Box>
    </form>

    <Divider>Or</Divider>
    <Typography>
      Back to login ?{" "}
      <Link className="text-blue-700" to={"/signIn"}>
        Sign In
      </Link>{" "}
    </Typography>
    
  </div>
  )
}

export default ForgetPassword