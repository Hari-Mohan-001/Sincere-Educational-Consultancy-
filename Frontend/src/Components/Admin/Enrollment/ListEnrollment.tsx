import {Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_BASE_URL} from "../../../Constants/Constants";

interface Enrollment {
  id: string;
  name: string;
  amount: string;
  image: string;
}
const ListEnrollment = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(`${ADMIN_BASE_URL}/enrollment`,{
          withCredentials:true
        });
        setEnrollments(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEnrollments();
  },[]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/add-enrollment");
  };

  const column = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "amount", label: "Amount", minWidth: 100 },
    {
      id: "image",
      label: "Image",
      minWidth: 100,
      render: (row: any) => (
        <img src={row.image} alt={row.name} style={{ width: 70, height: 70 }} />
      ),
    },
  ];

  return (
    <>
      <TableComponent title="Enrollment" columns={column} data={enrollments} />
      <div className="mt-4 mr-2">
        <Button onClick={handleClick} variant="contained">
          Add
        </Button>
      </div>
    </>
  );
};

export default ListEnrollment;
