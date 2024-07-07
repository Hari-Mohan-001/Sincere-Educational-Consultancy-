import { Box, Button, TextField, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../../../Constants/Constants";

const ForgetPassword = () => {

  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()
  const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
       setEmail(e.target.value)
  }

  const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            const response = await fetch(`${BASE_URL}/request-password-reset`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({email})
            })
           const data = await response.json()
           if(!response.ok){
            setError(data.message)
            return
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
            // error={Boolean(errors.email)}
            // helperText={errors.email}
            onChange={handleChange}
          />
        </Box>
        

        <Box display="flex" justifyContent="center">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
        {error && <p className="text-red-700">{error}</p>}
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