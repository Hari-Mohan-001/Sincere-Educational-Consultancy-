import TableComponent from "../../Layout/Table";
import { useEffect, useState } from "react";
import { adminApi } from "../../../Api/adminApi";
import { toast } from "react-toastify";

interface CourseData {
  _id: string;
  name: string;
  qualification: string;
  fees: string;
  description: string;
  logo: string;
  duration: string;
  universities: string[];
  universityName: string;
}

const AdminCourseList = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<
  CourseData[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseData = await adminApi.getAllCourses();
        if (courseData) {
          setCourses(courseData);
        } else {
          toast.error("Unable to fetch courses");
          return;
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
        course.name.toLowerCase().includes(lowerCaseQuery)
       
      );
    });
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

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
        <img src={row.logo} alt={row.name} style={{ width: 50, height: 50 }} />
      ),
    },
    {
      id: "duration",
      label: "Duration",
      minWidth: 100,
    },
    {
      id: "universityName",
      label: "University",
      minWidth: 100,
    },
  ];

  return (
    <>
    <div className="float-end mt-2">
          <input
            type="text"
            placeholder="Search courses"
            onChange={handleSearchChange}
            value={searchQuery}
            className="w-full max-w-xs p-2 border border-gray-400 rounded-md mb-3"
          />
        </div>
      <TableComponent title="Courses" columns={columns} data={filteredCourses} />
      
    </>
  );
};

export default AdminCourseList;
