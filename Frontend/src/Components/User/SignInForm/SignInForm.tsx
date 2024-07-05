import { Box, Button, TextField, Typography } from "@mui/material";

import Divider from "@mui/material/Divider";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    // email:"",
    // password:""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
    console.log(formData.email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    const password: string = formData.password;
    if (!password) {
      newErrors.password = "Password is required";
    } else if (
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      newErrors.password =
        "Password must have atlest 6 characters & must have one number and special character";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-center text-2xl">Welcome to Login page</h1>
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
              value={formData.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={handleChange}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Enter your Password</Typography>
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              value={formData.password}
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={handleChange}
            />
          </Box>

          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
        </Box>
      </form>

      <Divider>Or</Divider>
      <Typography>
        Don't have an account ?{" "}
        <Link className="text-blue-700" to={"/signUp"}>
          Register here
        </Link>{" "}
      </Typography>
      <Typography>
        Forget Password ?{" "}
        <Link className="text-blue-700" to={"/forgetPassword"}>
          Click here
        </Link>{" "}
      </Typography>
    </div>
  );
};

export default SignInForm;
