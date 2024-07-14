import { Box, Button, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signUpCounsellor } from "../../../Redux/Counsellor/CounsellorSlice";
import { AppDispatch } from "../../../Redux/Store";
import { toast } from "react-toastify";
import { ResponseData } from "../../../Interface/Counsellor/CounsellorInterface";
import { URL } from "../../../Constants/Constants";


interface Country {
  id: string;
  name: string;
  image: string;
}

interface Counsellor {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string
  country: string;
}

const CounsellorSignUpForm = () => {

    useEffect(()=>{
        const fetchCountries = async () => {
            try {
              const response = await axios.get(`${URL}/countries`);
              console.log(response.data);
              
              setCountries(response.data.data);
              console.log(countries);
              
            } catch (error) {
              console.error(error);
            }
          };
          fetchCountries();
    },[])
  const [formData, setFormData] = useState<Counsellor>({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    country: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [countries, setCountries] = useState<Country[]>([]);
 const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, country: e.target.value });
    setErrors({ ...errors, country: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ signUpError: "" });
   dispatch(signUpCounsellor(formData)).then((result)=>{
    
     if(signUpCounsellor.fulfilled.match(result)){
        toast.success("signup successfull")
        navigate("/counsellor/university")
     }else if(signUpCounsellor.rejected.match(result)){
        const payload = result.payload as ResponseData
        setErrors({ signUpError: payload?.message || "Failed to signup" });
        toast.error("Signup falied")
     }
   })

  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-center text-2xl">Counsellor register page</h1>
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
            <Typography variant="inherit">Select your Country</Typography>

            <FormControl
              fullWidth
              size="small"
              error={Boolean(errors.qualification)}
            >
              <InputLabel id="qualification-label">Country</InputLabel>
              <Select
                labelId="qualification-label"
                id="qualification"
                label="Qualification"
                value={formData?.country}
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countries?.map((country) => {
                  return <MenuItem value={country.id}>{country.name}</MenuItem>;
                })}
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
      {errors.signUpError && (
        <p className="text-red-700">{errors.signUpError}</p>
      )}
      <Divider>Or</Divider>
      <Typography>
        Already having an account ?{" "}
        <Link className="text-blue-700" to={"/counsellor/signIn"}>
          Login here
        </Link>{" "}
      </Typography>
    </div>
  );
};

export default CounsellorSignUpForm;