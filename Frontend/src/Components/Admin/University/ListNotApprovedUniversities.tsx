import { Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_BASE_URL } from "../../../Constants/Constants";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const mySwal = withReactContent(Swal);

interface UniversityData {
  _id: string;
  name: string;
  address: string;
  ranking: string;
  country: string;
  logo: string;
  images: string[];
  isApproved: boolean;
  countryName: string;
}

const ListNotApprovedUniversities = () => {
  const [universities, setUniversities] = useState<UniversityData[]>([]);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await axios.get(
          `${ADMIN_BASE_URL}/not-approved-universities`,
          {
            withCredentials: true,
          }
        );
        console.log("res", response.data);

        setUniversities(response.data.data);
        console.log("setubi", universities);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUniversity();
  }, []);

  const approveUniversity = async (id: string, isApproved: Boolean) => {
    try {
      const response = await axios.patch(
        `${ADMIN_BASE_URL}/university/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("University approved Successfully");
        setUniversities((prevUniversity) =>
          prevUniversity.map((university) =>
            university._id === id
              ? { ...university, isApproved: !isApproved }
              : university
          )
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle axios-specific errors here
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error instanceof Error) {
        // Handle other error types
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleClick = async (id: string, isApproved: Boolean) => {
    mySwal
      .fire({
        title: `Are you sure you want to ${
          isApproved ? "Approve" : "Approve"
        } this university?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.isConfirmed) {
          approveUniversity(id, isApproved);
        }
      });
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "address", label: "Address", minWidth: 100 },
    { id: "ranking", label: "Ranking", minWidth: 50 },
    {
      id: "country",
      label: "Country",
      minWidth: 100,
      render: (row: UniversityData) => row.countryName,
    },
    {
      id: "logo",
      label: "Logo",
      minWidth: 100,
      render: (row: UniversityData) => (
        <img src={row.logo} alt={row.name} style={{ width: 50, height: 50 }} />
      ),
    },
    {
      id: "isApproved",
      label: "Approved",
      minWidth: 50,
      render: (row: UniversityData) =>
        row.isApproved ? (
          <Button variant="contained" color="success">
            Approved
          </Button>
        ) : (
          <Button
            onClick={() => handleClick(row._id, row.isApproved)}
            variant="contained"
            color="error"
          >
            Approve
          </Button>
        ),
    },
  ];

  return (
    <div className="flex flex-col">
      <div>
        <TableComponent
          title="Universities For Approval"
          columns={columns}
          data={universities}
        />
      </div>
    </div>
  );
};

export default ListNotApprovedUniversities;
