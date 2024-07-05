import { Box, Button, TextField, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { useState } from "react";

const ForgetPassword = () => {

  const [email, setEmail] = useState<string>("")
  const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
       setEmail(e.target.value)
  }

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()

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