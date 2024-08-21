import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Enrollment } from "../../../Interface/Enrollment/IEnrollment";
import { adminApi } from "../../../Api/adminApi";

const ListEnrollment = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment>();
  const [updatedAmount, setUpdatedAmount] = useState<number | string>();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const enrollmentData = await adminApi.getEnrollments();
        setEnrollments(enrollmentData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEnrollments();
  }, []);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/add-enrollment");
  };

  const handleModal = (row: Enrollment) => {
    setOpen(true);
    setSelectedEnrollment(row);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedAmount(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      if (!updatedAmount || Number(updatedAmount) <= 0) {
        toast.error("Amount should be greater than zero");
        return;
      }
      const enrollData = {
        enrollId: selectedEnrollment?.id,
        enrollAmount: updatedAmount,
      };
      const update = await adminApi.updateEnrollment(enrollData);
      if (update) {
        setOpen(false);
        toast.success("Updated Successfully");
        //updating the local state
        setEnrollments((prevEnroll) =>
          prevEnroll.map((enroll) =>
            enroll.id === selectedEnrollment?.id
              ? { ...enroll, amount: updatedAmount.toString() }
              : enroll
          )
        );
        setUpdatedAmount("");
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      toast.error("An eror occured");
    }
  };

  const column = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "amount", label: "Amount (Rs)", minWidth: 100 },
    {
      id: "image",
      label: "Image",
      minWidth: 100,
      render: (row: any) => (
        <img src={row.image} alt={row.name} style={{ width: 70, height: 70 }} />
      ),
    },
    {
      id: "update",
      label: "Action",
      minWidth: 50,
      render: (row: Enrollment) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleModal(row)}
        >
          Update
        </Button>
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            padding: 20,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Update Enrollment
          </Typography>
          <Typography variant="inherit">Update the amount</Typography>
          <TextField
            id="amount"
            // label="Enrollment amount"
            fullWidth
            variant="outlined"
            defaultValue={selectedEnrollment?.amount}
            size="small"
            type="number"
            onChange={handleAmountChange}
          />
          <Box display="flex" justifyContent="center" mt={3}>
            <Button type="submit" variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default ListEnrollment;
