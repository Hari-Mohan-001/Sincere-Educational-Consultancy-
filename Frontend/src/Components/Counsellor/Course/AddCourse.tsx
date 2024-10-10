import { Box, Button, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CounsellorRootState } from "../../../Interface/Counsellor/CounsellorInterface";
import { useSelector } from "react-redux";
import { api } from "../../../Api/api";
import {
  validateCourseDomain,
  validateCourseDuration,
  validateCourseFees,
  validateCourseLogo,
  validateCourseName,
  validateCourseQualification,
  validateCourseUniversity,
  validateDescription,
} from "../../../Utils/Validation/courseValidation";
import { counsellorApi } from "../../../Api/counsellorApi";

interface DomainData {
  id: string;
  name: string;
  image: string;
}

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
  universities?: string[];
  domain?: string;
  logo?: string;
}

const AddCourseForm = () => {
  const { counsellor } = useSelector(
    (state: CounsellorRootState) => state.counsellor
  );
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const [domains, setDomains] = useState<DomainData[]>([]);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        if (counsellor) {
          const countryId = counsellor.country;
          const universities = await api.getUniversities(countryId);
          setUniversities(universities);
        } else {
          navigate("/counsellor/signin");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUniversity();
  }, []);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const domains = await api.getAllDomains();
        if (!domains) {
          toast.error("Failed to fetch domains");
        } else {
          setDomains(domains);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDomains();
  }, []);

  const [formData, setFormData] = useState<CourseData>({
    qualification: "",
    duration: "",
    universities: [],
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [logoError, setLogoError] = useState<string>();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoError("");
    const { id, value, files } = e.target;
    if (files) {
      const file = files[0];
      const logoError = validateCourseLogo(file);
      if (logoError) {
        setLogoError(logoError);
        return;
      }
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
  const handleUniversitySelectChange = (e: SelectChangeEvent<string[]>) => {
    setFormData({ ...formData, universities: e.target.value as string[] });
    setErrors({ ...errors, universities: "" });
  };
  const handleDomainSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, domain: e.target.value });
    setErrors({ ...errors, domain: "" });
  };
  const handleDuartionSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, duration: e.target.value });
    setErrors({ ...errors, duration: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ submitError: "" });
    const newErrors: { [key: string]: string } = {};

    newErrors.name = validateCourseName(formData?.name) || "";
    newErrors.qualification =
      validateCourseQualification(formData?.qualification) || "";
    newErrors.fees = validateCourseFees(formData?.fees) || "";
    newErrors.description = validateDescription(formData?.description) || "";
    newErrors.duration = validateCourseDuration(formData?.duration) || "";
    newErrors.university =
      validateCourseUniversity(formData?.universities) || "";
    newErrors.domain = validateCourseDomain(formData?.domain) || "";

    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key] === "") delete newErrors[key];
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (!formData.logo || logoError) {
      setLogoError("Select logo image file");
      return;
    }
    const loadToast = toast.loading("Please wait while adding");
    formData.fees = formData.fees + " Lakh/year";
    try {
      await counsellorApi.addCourse(formData);
      toast.dismiss(loadToast);
      navigate("/counsellor/courses");
      toast.success("Course added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const getUniversityNameById = (id: string) => {
    const university = universities.find((uni) => uni.id === id);
    return university ? university.name : "";
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-center text-2xl">Add Course</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box>
            <Typography variant="inherit">Enter the course name</Typography>
            <TextField
              id="name"
              label="name"
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
            <Typography variant="inherit">
              Enter the fees in lakhs/year
            </Typography>
            <TextField
              id="fees"
              label="fees"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.fees)}
              helperText={errors.fees}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Enter the Description</Typography>
            <TextField
              id="description"
              label="Description"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.description)}
              helperText={errors.description}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Select the Duration</Typography>

            <FormControl
              fullWidth
              size="small"
              error={Boolean(errors.duration)}
            >
              <InputLabel id="qualification-label">Duration</InputLabel>
              <Select
                labelId="qualification-label"
                id="qualification"
                label="Qualification"
                value={formData?.duration}
                onChange={handleDuartionSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="1 Year">1 year</MenuItem>
                <MenuItem value="2 Year">2 year</MenuItem>
                <MenuItem value="3 Year">3 year</MenuItem>
                <MenuItem value="4 Year">4 year</MenuItem>
                <MenuItem value="5 Year">5 year</MenuItem>
              </Select>
              {errors.duration && (
                <Typography variant="caption" color="error">
                  {errors.duration}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box>
            <Typography variant="inherit">Select the University</Typography>

            <FormControl
              fullWidth
              size="small"
              error={Boolean(errors.qualification)}
            >
              <InputLabel id="country-label">Universities</InputLabel>
              <Select
                labelId="qualification-label"
                id="universities"
                label="Universities"
                multiple
                value={formData?.universities}
                onChange={handleUniversitySelectChange}
                renderValue={(selected) =>
                  (selected as string[]).map(getUniversityNameById).join(", ")
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {universities?.map((university) => {
                  return (
                    <MenuItem key={university.id} value={university.id}>
                      {university.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {errors.university && (
                <Typography variant="caption" color="error">
                  {errors.university}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box>
            <Typography variant="inherit">Select the Domain</Typography>

            <FormControl fullWidth size="small" error={Boolean(errors.domain)}>
              <InputLabel id="domain-label">Domain</InputLabel>
              <Select
                labelId="domain-label"
                id="domain"
                label="Domain"
                value={formData?.domain}
                onChange={handleDomainSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {domains?.map((domain) => {
                  return (
                    <MenuItem key={domain.id} value={domain.id}>
                      {domain.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {errors.domain && (
                <Typography variant="caption" color="error">
                  {errors.domain}
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
              inputProps={{ accept: "image/*" }}
              onChange={handleChange}
            />
          </Box>
          {logoError && <p className="text-red-700">{logoError}</p>}

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
