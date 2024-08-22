import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import {
  validateAddress,
  validateCountry,
  validateLogo,
  validateName,
  validateRanking,
} from "../../../Utils/Validation/universityValidation";
import { api } from "../../../Api/api";
import { counsellorApi } from "../../../Api/counsellorApi";

interface Country {
  id: string;
  name: string;
  image: string;
}

interface UniversityData {
  name?: string;
  address?: string;
  ranking?: string;
  country?: string;
  logo?: string;
  images?: string[];
}

const AddUniversityForm = () => {
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await api.getAllCountries();
        setCountries(countries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState<UniversityData>({
    country: "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [logoError, setLogoerror] = useState<string>();
  

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    if (files) {
      setLogoerror("");
      const file = files[0];
      const logoError = validateLogo(file);
      if (logoError) {
        setLogoerror(logoError);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (id === "logo") {
          setLogoPreview(reader.result as string);
          setFormData({ ...formData, [id]: reader.result as string });
        } else if (id === "images") {
          Array.from(files).map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setImagePreviews((prev) => [...prev, reader.result as string]);
              setFormData((prev) => ({
                ...prev,
                images: [...(prev?.images || []), reader.result as string],
              }));
            };
            return reader;
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [id]: value });
    }
    setErrors({ ...errors, [id]: "" });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, country: e.target.value });
    setErrors({ ...errors, country: "" });
  };

  const handleDeleteImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev?.images?.filter((_, i) => i !== index),
    }));
    // Update the file input display
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      const updatedFiles = Array.from(fileInputRef.current.files || []).filter(
        (_, i) => i !== index
      );
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ submitError: "" });
    const newErrors: { [key: string]: string } = {};

    newErrors.name = validateName(formData?.name) || "";
    newErrors.address = validateAddress(formData?.address) || "";
    newErrors.ranking = validateRanking(formData?.ranking) || "";
    newErrors.country = validateCountry(formData?.country) || "";
    if (!formData.logo || !formData.images) {
      setLogoerror("Select logo and image file");
      return;
    }

    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key] === "") delete newErrors[key];
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    toast.promise(counsellorApi.addUniversity(formData), {
      pending: "Please wait",
      success: {
        render({ data }) {
          // Perform any success logic here
          console.log(data);
          navigate("/counsellor/university");
          return "University added successfully";
        },
      },
      error: {
        render({ data }) {
          if (data instanceof Error) {
            // Handle the error and return the error message
            return `Error: ${data.message}`;
          }
          return "An unknown error occurred";
        },
      },
    });
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-center text-2xl">Add University</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box>
            <Typography variant="inherit">
              Enter the name of university
            </Typography>
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
            <Typography variant="inherit">Enter the address</Typography>
            <TextField
              id="address"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.address)}
              helperText={errors.address}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Enter the ranking</Typography>
            <TextField
              id="ranking"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.ranking)}
              helperText={errors.ranking}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Select the country</Typography>

            <FormControl fullWidth size="small" error={Boolean(errors.country)}>
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                label="country"
                value={formData?.country}
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countries?.map((country) => {
                  return (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {errors.country && (
                <Typography variant="caption" color="error">
                  {errors.country}
                </Typography>
              )}
            </FormControl>
          </Box>
          {logoPreview && (
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="w-24 h-24 mt-2"
            />
          )}
          <Box>
            <Typography variant="inherit">Select the logo</Typography>
            <TextField
              fullWidth
              id="logo"
              type="file"
              variant="outlined"
              size="small"
              error={Boolean(errors.logo)}
              helperText={errors.logo}
              onChange={handleChange}
            />
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap={2}
            mt={2}
          >
            {imagePreviews?.map((preview, index) => {
              return (
                <Box key={index} position="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24"
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteImage(index)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
          <Box>
            <Typography variant="inherit">Choose images</Typography>
            <TextField
              fullWidth
              id="images"
              type="file"
              inputProps={{ multiple: true }}
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
        </Box>
        {logoError && <p className="text-red-700">{logoError}</p>}
      </form>
      {errors.signUpError && (
        <p className="text-red-700">{errors.signUpError}</p>
      )}
    </div>
  );
};

export default AddUniversityForm;
