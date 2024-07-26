import { useEffect, useState } from "react";
import { ADMIN_BASE_URL } from "../../../Constants/Constants";
import { ResponseUserData } from "../../../Interface/User/UserInterface";
import axios from "axios";
import TableComponent from "../../Layout/Table";
import { Button } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const mySwal = withReactContent(Swal);

const StudentList = () => {
  const [users, setUsers] = useState<ResponseUserData[]>([]);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const response = await axios.get(`${ADMIN_BASE_URL}/users`, {
          withCredentials: true,
        });
        const data = response.data;

        setUsers(data.userData);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUser();
  }, []);

  const blockUser = async (id: string, isBlocked: Boolean) => {
    try {
      const response = await axios.patch(
        `${ADMIN_BASE_URL}/user/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        toast.success("User blocked Successfully");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, isBlocked: !isBlocked } : user
          )
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleClick = async (id: string, isBlocked: Boolean) => {
    mySwal
      .fire({
        title: `Are you sure you want to ${
          isBlocked ? "unblock" : "block"
        } this user?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.isConfirmed) {
          blockUser(id, isBlocked);
        }
      });
  };

  const column = [
    // { id: "no", label: "No", minWidth: 50 },
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
    {
      id: "isBlocked",
      label: "Action",
      minWidth: 50,
      render: (row: ResponseUserData) =>
        row.isBlocked ? (
          <Button
            onClick={() => handleClick(row.id, row.isBlocked)}
            variant="contained"
            color="success"
          >
            Un Block
          </Button>
        ) : (
          <Button
            onClick={() => handleClick(row.id, row.isBlocked)}
            variant="contained"
            color="error"
          >
            Block
          </Button>
        ),
    },
  ];
  return (
    <>
      <TableComponent title="Students List" columns={column} data={users} />
    </>
  );
};

export default StudentList;
