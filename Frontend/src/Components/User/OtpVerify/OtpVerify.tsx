import { Box, Button, TextField, Typography } from "@mui/material";

import { useState } from "react";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
    setError("")
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(otp===""){
        setError("Enter the otp to proceed")
    }
  };
  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-center text-2xl">Enter the otp to signup</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Enter your otp</Typography>
            <TextField
              id="otp"
              label="otp"
              fullWidth
              variant="outlined"
              size="small"
              value={otp}
                error={Boolean(error)}
                helperText={error}
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
  );
};

export default OtpVerify;
