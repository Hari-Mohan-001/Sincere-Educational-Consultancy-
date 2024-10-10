import { useEffect, useState } from "react";
import { ResponseUserData } from "../../../Interface/User/UserInterface";
import TableComponent from "../../Layout/Table";
import { Button } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { adminApi } from "../../../Api/adminApi";

const mySwal = withReactContent(Swal);

const StudentList = () => {
  const [users, setUsers] = useState<ResponseUserData[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<
  ResponseUserData[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const usersData = await adminApi.getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUser();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      // Convert isBlocked to "blocked" or "unblocked" for search purposes
    const blockStatus = user.isBlocked ? "blocked" : "unblocked";
      return (
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        blockStatus.includes(lowerCaseQuery)
      );
    });
    setFilteredStudents(filtered);
  }, [searchQuery, users]);

  const blockUser = async (id: string, isBlocked: Boolean) => {
    try {
      const response = await adminApi.blockUser(id);
      if (response) {
        toast.success("User blocked Successfully");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, isBlocked: !isBlocked } : user
          )
        );
      } else {
        toast.error("Error while blocking");
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
    <div className="float-end">
          <input
            type="text"
            placeholder="Search students"
            onChange={handleSearchChange}
            value={searchQuery}
            className="w-full max-w-xs p-2 border border-gray-400 rounded-md mb-3"
          />
        </div>
      <TableComponent title="Students List" columns={column} data={filteredStudents} />
    </>
  );
};

export default StudentList;
