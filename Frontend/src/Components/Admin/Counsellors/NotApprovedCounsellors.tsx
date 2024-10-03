import { Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { adminApi } from "../../../Api/adminApi";

const mySwal = withReactContent(Swal);

interface CounsellorData {
  id: string;
  name: string;
  email: string;
  mobile: string;
  country: string;
  isApproved: boolean;
  image: string;
}

const NotApprovedCounsellors = () => {
  const [counsellors, setCounsellors] = useState<CounsellorData[]>([]);

  useEffect(() => {
    const fetchUnApprovedCounsellors = async () => {
      try {
        const unApprovedcounsellors = await adminApi.getUnApprovedCounsellors();
        if (unApprovedcounsellors) {
          setCounsellors(unApprovedcounsellors);
        } else {
          toast.error("unable to fetch universities");
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnApprovedCounsellors();
  }, []);

  const approveTheCounsellor = async (id: string, isApproved: Boolean) => {
    try {
      const response = await adminApi.approveCounsellor(id);
      if (response) {
        toast.success("University approved Successfully");
        setCounsellors((prevCounsellors) =>
          prevCounsellors.map((counsellor) =>
            counsellor.id === id
              ? { ...counsellor, isApproved: !isApproved }
              : counsellor
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
        } this counsellor?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.isConfirmed) {
          approveTheCounsellor(id, isApproved);
        }
      });
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "mobile", label: "Mobile", minWidth: 50 },
    {
      id: "country",
      label: "Country",
      minWidth: 100,
    },
    {
      id: "image",
      label: "Image",
      minWidth: 100,
      render: (row: CounsellorData) => (
        <img src={row.image} alt={row.name} style={{ width: 50, height: 50 }} />
      ),
    },
    {
      id: "isApproved",
      label: "Approved",
      minWidth: 50,
      render: (row: CounsellorData) =>
        row.isApproved ? (
          <Button variant="contained" color="success">
            Approved
          </Button>
        ) : (
          <Button
            onClick={() => handleClick(row.id, row.isApproved)}
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
          title="Counsellors For Approval"
          columns={columns}
          data={counsellors}
        />
      </div>
    </div>
  );
};

export default NotApprovedCounsellors;
