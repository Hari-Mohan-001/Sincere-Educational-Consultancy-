import { useEffect, useState } from "react";
import { ADMIN_BASE_URL } from "../../../Constants/Constants";
import { ResponseUserData } from "../../../Interface/User/UserInterface";
import axios from "axios";
import TableComponent from "../../Layout/Table";

const StudentList = () => {
  const [users, setUsers] = useState<ResponseUserData[]>([]);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        console.log("use");
        const response = await axios.get(`${ADMIN_BASE_URL}/users`);
        const data = response.data;
        console.log("dat", data);

        setUsers(data.userData);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUser();
  }, []);

  const column = [
    { id: "no", label: "No", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "mobile", label: "Mobile", minWidth: 100 },
    { id: "qualification", label: "Qualification", minWidth: 100 },
    {
      id: "isEnrolled",
      label: "Enrolled",
      minWidth: 50,
      render: (row: ResponseUserData) => (row.isEnrolled ? "Yes" : "No"),
    },
  ];
  return (
    <>
      <TableComponent title="Students List" columns={column} data={users} />
    </>
  );
};

export default StudentList;
