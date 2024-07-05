import { Box, Button, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUpForm = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    qualification:""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, qualification: e.target.value });
    setErrors({ ...errors, qualification: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is reqired";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number should have ten digits";
    }
    if (!formData.qualification) {
      console.log("err");

      newErrors.qualification = "Qualification is required";
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
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (password !== formData.confirmPassword) {
      newErrors.confirmPassword = "The password does'nt match";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(formData);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-center text-2xl">Welcome to register page</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box>
            <Typography variant="inherit">Enter your name</Typography>
            <TextField
              id="name"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.name)}
              helperText={errors.name}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Enter your email id</Typography>
            <TextField
              id="email"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Enter your mobile number</Typography>
            <TextField
              id="mobile"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Select your qualification</Typography>

            <FormControl
              fullWidth
              size="small"
              error={Boolean(errors.qualification)}
            >
              <InputLabel id="qualification-label">Qualification</InputLabel>
              <Select
                labelId="qualification-label"
                id="qualification"
                label="Qualification"
                value={formData.qualification}
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="PlusTwo">Plus Two</MenuItem>
                <MenuItem value="Degree">Degree</MenuItem>
                <MenuItem value="Masters">Masters</MenuItem>
              </Select>
              {errors.qualification && (
                <Typography variant="caption" color="error">
                  {errors.qualification}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box>
            <Typography variant="inherit">Enter your Password</Typography>
            <TextField
              fullWidth
              id="password"
              type="password"
              variant="outlined"
              size="small"
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Confirm your Password</Typography>
            <TextField
              fullWidth
              id="confirmPassword"
              type="password"
              variant="outlined"
              size="small"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Register
            </Button>
          </Box>
        </Box>
      </form>

      <Divider>Or</Divider>
      <Typography>
        Already having an account ?{" "}
        <Link className="text-blue-700" to={"/signIn"}>
          login here
        </Link>{" "}
      </Typography>
    </div>
  );
};

export default SignUpForm;
