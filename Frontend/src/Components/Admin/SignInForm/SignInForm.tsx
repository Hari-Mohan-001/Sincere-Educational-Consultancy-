import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../Redux/Store";
import { toast } from "react-toastify";
import {
  AdminRootState,
  ResponseData,
  signInAdminData,
} from "../../../Interface/Admin/AdminInterface";
import { signInAdmin } from "../../../Redux/Admin/AdminSlice";

const AdminSignInForm = () => {
  const [formData, setFormData] = useState<signInAdminData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch<AppDispatch>();
  const { admin } = useSelector((state: AdminRootState) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, [admin, navigate]);

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
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(signInAdmin(formData)).then((result) => {
      if (signInAdmin.fulfilled.match(result)) {
        toast.success("Login success");
        navigate("/admin/dashboard");
      } else if (signInAdmin.rejected.match(result)) {
        const payload = result.payload as ResponseData;
        setErrors({ signInError: payload?.message || "Failed to login" });
        toast.error("Login failed");
      }
    });
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg">
      <h1 className="text-center text-2xl">Admin Login page</h1>
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
            <Button type="submit" variant="contained" className="w-full">
              Login
            </Button>
          </Box>
          {errors.signInError && (
            <p className="text-red-600">{errors.signInError}</p>
          )}
        </Box>
      </form>
    </div>
  );
};

export default AdminSignInForm;
