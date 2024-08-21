import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminApi } from "../../../Api/adminApi";

const AddEnrollment = () => {
  const [errors, setErrors] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const navigate = useNavigate();

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      } else {
        setErrors("Error loading image");
      }
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors("");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
      previewFile(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors("");
    setName(e.target.value);
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors("");
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? undefined : value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !name || !amount) {
      setErrors("All feilds are mandatory");
      return;
    }
    if (amount < 1) {
      setErrors("Amount must be greater than 0");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("amount", amount.toString());
    formData.append("file", file);
    const toastId = toast.loading("Loading....");
    const enrollmentData = {
      name: name,
      amount: amount,
      image: image,
    };
    try {
      const response = await adminApi.addEnrollment(enrollmentData);
      // Update the loading toast to success
      toast.update(toastId, {
        render: "Enrollment added successfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      // Clear form data and state after successful submission
      setFile(null);
      setImage(null);
      setName("");
      setErrors("");
      navigate("/admin/enrollment");
    } catch (error: unknown) {
      console.log("Error:", error);

      // Update the loading toast to error
      toast.update(toastId, {
        render: "Failed to add country/check the file type",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-center text-2xl">Add New Enrollment</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Enter the Enrolment name</Typography>
            <TextField
              id="name"
              label="Enrollment name"
              fullWidth
              variant="outlined"
              size="small"
              onChange={handleNameChange}
            />
          </Box>
          {image && <img className="w-24 h-24" src={image} alt="Preview" />}
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Choose an Image</Typography>
            <TextField
              fullWidth
              id="image"
              type="file"
              variant="outlined"
              size="small"
              onChange={handleChange}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Enter the amount</Typography>
            <TextField
              id="amount"
              label="Enrollment amount"
              fullWidth
              variant="outlined"
              size="small"
              type="number"
              onChange={handleAmountChange}
            />
          </Box>

          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Box>
          {errors && <p className="text-red-600">{errors}</p>}
        </Box>
      </form>
    </div>
  );
};

export default AddEnrollment;
