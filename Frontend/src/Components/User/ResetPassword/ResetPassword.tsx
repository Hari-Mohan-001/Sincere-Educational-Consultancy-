import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  validateConfirmPasswordAndCompare,
  validatePassword,
} from "../../../Utils/Validation/UserSignUpValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";
import { userApi } from "../../../Api/userApi";

const ResetPassword = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState<{ [key: string]: string }>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const token = queryParams.get("token");
  const id = queryParams.get("id");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    newErrors.password = validatePassword(formData.password) || "";
    newErrors.confirmPassword =
      validateConfirmPasswordAndCompare(
        formData.password,
        formData.confirmPassword
      ) || "";
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key] === "") delete newErrors[key];
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const password = formData.password;
    const response = await userApi.resetPassword(id, password);
    if (response) {
      toast.success("Password updated successfully");
      navigate("/signIn");
    } else {
      toast.error("Updation failed");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-center text-2xl">Reset Your Password</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Enter your Password</Typography>
            <TextField
              type="password"
              id="password"
              label="password"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={handleChange}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Confirm your Password</Typography>
            <TextField
              type="password"
              fullWidth
              id="confirmPassword"
              label="Password"
              variant="outlined"
              size="small"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              onChange={handleChange}
            />
          </Box>

          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
          {/* {error && <p className="text-red-700">{error}</p>} */}
        </Box>
      </form>
    </div>
  );
};

export default ResetPassword;
