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

  const [courses, setCourses] = useState<CourseData[]>([]);

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
      <TableComponent title="Courses" columns={columns} data={courses} />
      <div className="mt-4 mr-2"></div>
    </>
  );
};

export default AdminCourseList;
