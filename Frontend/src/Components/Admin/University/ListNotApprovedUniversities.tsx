import { Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { adminApi } from "../../../Api/adminApi";

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
    const fetchUnApprovedUniversities = async () => {
      try {
        const unApprovedUniversities =
          await adminApi.getUnapprovedUniversities();
        if (unApprovedUniversities) {
          setUniversities(unApprovedUniversities);
        } else {
          toast.error("unable to fetch universities");
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnApprovedUniversities();
  }, []);

  const approveUniversity = async (id: string, isApproved: Boolean) => {
    try {
      const response = await adminApi.approveUniversity(id);
      if (response) {
        toast.success("University approved Successfully");
        setUniversities((prevUniversity) =>
          prevUniversity.map((university) =>
            university._id === id
              ? { ...university, isApproved: !isApproved }
              : university
          )
        );
      } else {
        toast.error("Failed to approve");
      }
    } catch (error) {
      console.log(error);
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
