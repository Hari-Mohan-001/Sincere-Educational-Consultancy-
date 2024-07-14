import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { COUNSELLORBASEURL, URL } from "../../../Constants/Constants";

import { toast } from "react-toastify";
import { CounsellorRootState } from "../../../Interface/Counsellor/CounsellorInterface";
import { useSelector } from "react-redux";

// interface Country {
//   id: string;
//   name: string;
//   image: string;
// }

interface UniversityData {
  id?: string;
  name?: string;
  address?: string;
  ranking?: string;
  country?: string;
  logo?: string;
  images?: string[];
}

interface CourseData {
  name?: string;
  qualification?: string;
  fees?: string;
  description?: string;
  duration?: string;
  university?: string;
  logo?: string;
}

const AddCourseForm = () => {
  const { counsellor } = useSelector(
    (state: CounsellorRootState) => state.counsellor
  );
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  useEffect(() => {
    const fetchUniversity = async () => {
      console.log("unisrt", counsellor);

      try {
        if (counsellor) {
          const countryId = counsellor.country;

          const response = await axios.get(`${URL}/universities/${countryId}`);
          console.log("resaddcrs", response.data);
          setUniversities(response.data.getUniversities);
        } else {
          navigate("/counsellor/signin");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUniversity();
  }, []);

  const [formData, setFormData] = useState<CourseData>({
    qualification:"",
    university:""
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (id === "logo") {
          setLogoPreview(reader.result as string);
          setFormData({ ...formData, [id]: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [id]: value });
    }
    setErrors({ ...errors, [id]: "" });
  };

  const handleQualifiactionSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, qualification: e.target.value });
    setErrors({ ...errors, qualification: "" });
  };
  const handleUniversitySelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, university: e.target.value });
    setErrors({ ...errors, university: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ submitError: "" });
    try {
      const response = await axios.post(
        `${COUNSELLORBASEURL}/course`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('crse',response.data);
      toast.success("Course added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-center text-2xl">Add University</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box>
            <Typography variant="inherit">Enter the course name</Typography>
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
                value={formData?.qualification}
                onChange={handleQualifiactionSelectChange}
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
            <Typography variant="inherit">Enter the fees</Typography>
            <TextField
              id="fees"
              fullWidth 
              variant="outlined"
              size="small"
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Enter the Description</Typography>
            <TextField
              id="description"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Enter the Duartion</Typography>
            <TextField
              id="duration"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Select the University</Typography>

            <FormControl
              fullWidth
              size="small"
              error={Boolean(errors.qualification)}
            >
              <InputLabel id="country-label">University</InputLabel>
              <Select
                labelId="qualification-label"
                id="qualification"
                label="Qualification"
                value={formData?.university}
                onChange={handleUniversitySelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {universities?.map((university) => {
                  return (
                    <MenuItem value={university.id}>{university.name}</MenuItem>
                  );
                })}
              </Select>
              {errors.qualification && (
                <Typography variant="caption" color="error">
                  {errors.qualification}
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
              error={Boolean(errors.password)}
              helperText={errors.password}
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
      {errors.signUpError && (
        <p className="text-red-700">{errors.signUpError}</p>
      )}
    </div>
  );
};

export default AddCourseForm;
