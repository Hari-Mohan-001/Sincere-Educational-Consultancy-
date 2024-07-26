import { Box, Button, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../Redux/User/UserSlice";
import { AppDispatch } from "../../../Redux/Store";
import { ResponseData, RootState, UserData } from "../../../Interface/User/UserInterface";
import { ValidateEmail, validateMobile, validateName, validateQualification,validatePassword, validateConfirmPasswordAndCompare } from "../../../Utils/Validation/UserSignUpValidation";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

const SignUpForm = () => {
  const {user} = useSelector((state:RootState)=>state.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user){
      console.log(user);
      
      navigate("/home")
    }
  },[user, navigate])

  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    mobile: "",
    qualification: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch<AppDispatch>();


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
    setErrors({signUpError:""})

    const newErrors: { [key: string]: string } = {};

     newErrors.name = validateName(formData.name) || "";
     newErrors.email = ValidateEmail(formData.email) || "";
     newErrors.mobile = validateMobile(formData.mobile)||"";
     newErrors.qualification = validateQualification(formData.qualification)||"";
     newErrors.password = validatePassword(formData.password)||"";
     newErrors.confirmPassword = validateConfirmPasswordAndCompare(formData.password, formData.confirmPassword)||"";
     
     Object.keys(newErrors).forEach(key => {
      if (newErrors[key] === "") delete newErrors[key];
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(signUpUser(formData)).then((result) => {
      if (signUpUser.fulfilled.match(result)) {
        navigate("/verifyOtp");
      } else {
        const payload = result.payload as ResponseData;
        setErrors({ signUpError: payload?.message || "Failed to signup" });
      }
    });
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
            <Divider>Or</Divider>
            <GoogleAuth/>
          </Box>
        </Box>
        
      </form>
      {errors.signUpError && (
        <p className="text-red-700">{errors.signUpError}</p>
      )}
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
