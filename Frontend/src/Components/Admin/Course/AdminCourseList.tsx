import { Box, Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_BASE_URL} from "../../../Constants/Constants";



interface CourseData {
  _id: string;
  name: string;
  qualification: string;
  fees: string;
  description:string;
  logo: string;
  duration: string;
  universities: string[];
  universityName:string;
}

const AdminCourseList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      
      try {
       
          const response = await axios.get(`${ADMIN_BASE_URL}/courses`,{
            withCredentials:true
          });
          setCourses(response.data.data);
          console.log('setubi',courses);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  const [courses, setCourses] = useState<CourseData[]>([]);

  // const handleClick = () => {
  //   navigate("/counsellor/add-university");
  // };

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "qualification", label: "Qualification", minWidth: 100 },
    { id: "fees", label: "Fees", minWidth: 50 },
    { id: "description", label: "Description", minWidth: 100},
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
      <TableComponent title="Courses" columns={columns} data={courses}/>
      <div className="mt-4 mr-2">
      </div>
    </>
  );
};

export default AdminCourseList;
