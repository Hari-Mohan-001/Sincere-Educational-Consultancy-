import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { counsellorApi } from "../../../Api/counsellorApi";

const AddDomain = () => {
  const [errors, setErrors] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      setErrors("Enter a name");
      return;
    }
    if (!file) {
      setErrors("Select a file");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    const toastId = toast.loading("Loading....");
    try {
      const data = {
        name: name,
        image: image,
      };
      const response = await counsellorApi.addDomain(data);
      // Update the loading toast to success
      toast.update(toastId, {
        render: "Domain added successfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      // Clear form data and state after successful submission
      setFile(null);
      setImage(null);
      setName("");
      setErrors("");
      navigate("/counsellor/domain");
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
      <h1 className="text-center text-2xl">Add New Domain</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Enter the domain name</Typography>
            <TextField
              id="name"
              label="Country name"
              fullWidth
              variant="outlined"
              size="small"
              // value={formData.email}
              // error={Boolean(errors.email)}
              // helperText={errors.email}
              onChange={handleNameChange}
            />
          </Box>
          {image && <img className="w-28 h-28" src={image} alt="Preview" />}
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

export default AddDomain;
