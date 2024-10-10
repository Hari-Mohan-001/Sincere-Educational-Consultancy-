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
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<
  CourseData[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        course.name.toLowerCase().includes(lowerCaseQuery) ||
         course.uninversityName?.toLowerCase().includes(lowerCaseQuery)
       
      );
    });
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  

  const handleClick = () => {
    navigate("/counsellor/add-course");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
    <div>
      <div className="flex float-end">
      <div className="mt-2 mr-2">
        <Button onClick={handleClick} variant="contained">
          Add Course
        </Button>
      </div>
      <div className="float-end mt-2">
          <input
            type="text"
            placeholder="Search courses"
            onChange={handleSearchChange}
            value={searchQuery}
            className="w-full max-w-xs p-2 border border-gray-400 rounded-md mb-3"
          />
        </div>
        </div>
      <TableComponent title="Courses" columns={columns} data={filteredCourses} />
    </div>
  );
};

export default ListCourse;
