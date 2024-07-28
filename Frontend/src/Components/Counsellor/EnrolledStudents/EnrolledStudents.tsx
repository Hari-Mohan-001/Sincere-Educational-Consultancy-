import {  Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { COUNSELLORBASEURL} from "../../../Constants/Constants";
import { CounsellorRootState } from "../../../Interface/Counsellor/CounsellorInterface";
import { useSelector } from "react-redux";

interface EnrollmentData{
id:string,
userId:string,
userName:string,
userEmail:string,
enrollType:string,
enrollImage:string
}

const EnrolledStudents = () => {
  const navigate = useNavigate();
  const { counsellor } = useSelector(
    (state: CounsellorRootState) => state.counsellor
  );
  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      
      try {
        if (counsellor) {
          const countryId = counsellor.country;
          const response = await axios.get(`${COUNSELLORBASEURL}/enrollments/${countryId}`);
          setStudents(response.data.data);
        } else {
          navigate("/counsellor/signin")
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEnrolledStudents();
  }, []);

  const [students, setStudents] = useState<EnrollmentData[]>([]);

//   const handleClick = () => {
//     navigate("/counsellor/add-course");
//   };

  const columns = [
    { id: "userName", label: "Name", minWidth: 100 },
    { id: "userEmail", label: "Email", minWidth: 100 },
    { id: "enrollType", label: "Enroll Type", minWidth: 50 },
    {
      id: "logo",
      label: "Logo",
      minWidth: 100,
      render: (row: EnrollmentData) => (
        <img src={row.enrollImage} alt={row.enrollType} style={{ width: 80, height: 80 }} />
      ),
    },
    {
      id: "",
      label: "Action",
      minWidth: 100,
      render: (row: EnrollmentData) => (
        <Button variant="contained" color="success">
            Schedule
          </Button>
      ),
    },
    // {
    //   id: "duration",
    //   label: "Duration",
    //   minWidth: 50,
    // },
  ];

  return (
    <>
      <TableComponent title="Students" columns={columns} data={students}/>
      <div className="mt-4 mr-2">
        {/* <Button onClick={handleClick} variant="contained">
          Add
        </Button> */}
      </div>
    </>
  );
};

export default EnrolledStudents;
