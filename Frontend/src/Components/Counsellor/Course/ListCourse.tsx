import { Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CounsellorRootState } from "../../../Interface/Counsellor/CounsellorInterface";
import { useSelector } from "react-redux";
import { counsellorApi } from "../../../Api/counsellorApi";

interface CourseData {
  name: string;
  qualification: string;
  fees: string;
  description: string;
  duration: string;
  university: string;
  domain: string;
  logo: string;
  uninversityName: string;
}

const ListCourse = () => {
  const navigate = useNavigate();
  const { counsellor } = useSelector(
    (state: CounsellorRootState) => state.counsellor
  );
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (counsellor) {
          const countryId = counsellor.country;
          const courses = await counsellorApi.getCoursesByCountryId(countryId);
          setCourses(courses);
        } else {
          navigate("/counsellor/signin");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  const [courses, setCourses] = useState<CourseData[]>([]);

  const handleClick = () => {
    navigate("/counsellor/add-course");
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "qualification", label: "Qualification", minWidth: 100 },
    { id: "fees", label: "Fees", minWidth: 50 },
    { id: "description", label: "Description", minWidth: 100 },
    {
      id: "logo",
      label: "Logo",
      minWidth: 100,
      render: (row: CourseData) => (
        <img src={row.logo} alt={row.name} style={{ width: 80, height: 80 }} />
      ),
    },
    {
      id: "duration",
      label: "Duration",
      minWidth: 50,
    },
    { id: "universityName", label: "University", minWidth: 100 },
  ];

  return (
    <>
      <TableComponent title="Courses" columns={columns} data={courses} />
      <div className="mt-4 mr-2">
        <Button onClick={handleClick} variant="contained">
          Add
        </Button>
      </div>
    </>
  );
};

export default ListCourse;
