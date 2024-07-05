import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";


const ResetPassword = () => {
const [formData, setFormData]= useState<{ [key: string]: string }>({})
const [error, setError] = useState<string>("")

const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
       setFormData({...formData,[e.target.id]:e.target.value})
       setError(e.target.id="")
}

const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault()
     const password: string = formData.password;
    if (!password) {
       setError("Password is required");
       return
    } else if (
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      
       setError("Password must have atlest 6 characters & must have one number and special character");
       return
    }
    if(password !== formData.confirmPassword){
        setError("Password does'nt match")
    }
}

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-center text-2xl">Welcome to Login page</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Enter your Password</Typography>
            <TextField
            type="password"
              id="password"
              label="Email"
              fullWidth
              variant="outlined"
              size="small"
              value={formData.password}
               error={Boolean(error)}
               helperText={error}
              onChange={handleChange}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Confirm your Password</Typography>
            <TextField
            type="password"
              fullWidth
              id=" confirmPassword"
              label="Password"
              variant="outlined"
              size="small"
              value={formData.confirmPassword}
            //   error={Boolean(errors.password)}
            //   helperText={errors.password}
              onChange={handleChange}
            />
          </Box>

          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  )
}

export default ResetPassword