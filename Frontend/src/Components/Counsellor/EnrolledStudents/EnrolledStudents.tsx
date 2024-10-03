import { Button, Modal, Typography } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { CounsellorRootState } from "../../../Interface/Counsellor/CounsellorInterface";
import { useSelector } from "react-redux";
import { format, parse } from "date-fns";
import { toast } from "react-toastify";

import { counsellorApi } from "../../../Api/counsellorApi";
import { useSocket } from "../../../Context/SocketContext";

interface OrderData {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  enrollType: string;
  enrollImage: string;
  meetingSchedule?: { date: string; time: string };
  createdAt:string,
  rescheduleRequest:boolean
}

const EnrolledStudents = () => {
  const navigate = useNavigate();
  const { counsellor } = useSelector(
    (state: CounsellorRootState) => state.counsellor
  );
 
  const [students, setStudents] = useState<OrderData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<OrderData | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const {socket} = useSocket()
  const hasJoined = useRef(false) // Track if the user has joined already

  useEffect(()=>{
     if(socket && counsellor && !hasJoined.current){
      socket.emit('join', counsellor.id,'counsellor') 
      hasJoined.current = true  // Mark as joined to prevent re-joining
     }

     return()=>{
      socket?.off('join')
     }
  },[socket,counsellor])

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        if (counsellor) {
          const countryId = counsellor.country;
          const enrolledOrders = await counsellorApi.getErrolledOrders(
            countryId
          );
          setStudents(enrolledOrders.reverse());
        } else {
          navigate("/counsellor/signin");
        }
      } catch (error) {
        console.error(error);
      }
    };

    
    fetchEnrolledStudents();
    return () => {
     
    };
  }, []);

   // Update the students array whenever the selectedStudent object changes
   useEffect(() => {
    if (selectedStudent) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.userId === selectedStudent.userId
            ? { ...student, meetingSchedule: selectedStudent.meetingSchedule ,rescheduleRequest:false}
            : student
        )
      );
    }
  }, [selectedStudent]);

  const handleScheduleClick = (student: OrderData) => { 
    setSelectedStudent(student);
    setOpen(true);
  };

  // Handle date change
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // Handle schedule meeting
  const handleScheduleMeeting = async () => {
    if (!selectedStudent || !selectedDate) return;

    try {
      //create event for the meeting as per the details entered
      const dateObject = new Date(selectedDate);
      const date = format(dateObject, "dd-MM-yyyy");
      const time = format(dateObject, "HH:mm:ss");
      const orderId = selectedStudent._id;

      const details = {
        date: date,
        time: time,
        userId: selectedStudent.userId,
        userName: selectedStudent.userName,
        userEmail: selectedStudent.userEmail,
        enrollType: selectedStudent.enrollType,
        enrollImage: selectedStudent.enrollImage,
        selectedDate,
        counsellorId: counsellor?.id,
        orderId: orderId,
      };
      const response = await counsellorApi.createEventWithMeetingDetails(
        details
      );
      if (response) {
        // Update the selectedStudent object with the scheduled meeting details
        setSelectedStudent({
          ...selectedStudent,
          meetingSchedule: { date, time },
          rescheduleRequest:false,
        });
        
        toast.success("Meeting scheduled successfully");
      }
      // Optionally update the UI or notify the user
    } catch (error) {
      console.error("Error scheduling meeting:", error);
    }

    setOpen(false);
  };

  const handleChatClick = (student: OrderData) => {
    // navigate(`/counsellor/chat/${counsellor?.id}/${student.userId}`)

    //using the react router state feature to hide the id from urls
    navigate(`/counsellor/chat`, {
      state: { counsellorId: counsellor?.id, userId: student.userId },
    });
    setSelectedStudent(student);
  };

  const handleVideoCallClick = (studentId: string) => {
    // if (socket) {
    //   socket.emit("startCall", { to: studentId });
    //   // navigate(`/counsellor/video-call/${counsellor?.id}/${studentId}`);
    //   navigate(`/counsellor/video-call`, {
    //     state: { counsellorId: counsellor?.id, userId: studentId },
    //   });
    // }
    navigate('/counsellor/video-call',{
      state:{userId: studentId }
    })
  };

  const columns = [
    { id: "userName", label: "Name", minWidth: 100 },
    { id: "userEmail", label: "Email", minWidth: 100 },
    { id: "enrollType", label: "Enroll Type", minWidth: 50 },
    {
      id: "logo",
      label: "Logo",
      minWidth: 100,
      render: (row: OrderData) => (
        <img
          src={row.enrollImage}
          alt={row.enrollType}
          style={{ width: 80, height: 80 }}
        />
      ),
    },
    {
      id: "meeting",
      label: "Meeting",
      minWidth: 100,
      render: (row: OrderData) => {
        // Combine date and time to create a full Date object for the meeting
        const meetingDate = row.meetingSchedule?.date
          ? parse(`${row.meetingSchedule.date} ${row.meetingSchedule.time}`, "dd-MM-yyyy HH:mm:ss", new Date())
          : null;
    
        return row.meetingSchedule?.date && row.meetingSchedule.time ? (
          <div>
            <div>Date: {row.meetingSchedule.date}</div>
            <div>Time: {row.meetingSchedule.time}</div>
            {/* Compare the parsed meeting date with the current date */}
            {meetingDate && meetingDate > new Date() ? (
              <Button variant="contained" color="secondary" onClick={() => handleScheduleClick(row)}>
                Re-Schedule
              </Button>
            ) : (
              <Button variant="outlined" color="success">
                Completed
              </Button>
            )}
          </div>
        ) : ( 
          <Button variant="contained" color="success" onClick={() => handleScheduleClick(row)}>
            Schedule
          </Button>
        );
      },
    },
    {
      id: "Reschudule request",
      label: "Reschudule Request",
      minWidth: 100,
      render: (row: OrderData) =>
        row.rescheduleRequest === true ? (
          <Button variant="contained" color="warning">
            Requested
          </Button>
        ) : (
          <Button
            variant="contained"
          >
            Nil
          </Button>
        ),
    },
    {
      id: "chat",
      label: "Chat/Call",
      minWidth: 100,
      render: (row: OrderData) =>
        row.enrollType === "Chat" ? (
          <Button variant="contained" onClick={() => handleChatClick(row)}>
            Chat
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => handleVideoCallClick(row.userId)}
          >
            Video Call
          </Button>
        ),
    },
  ];

  return ( 
    <>
      <TableComponent title="Students" columns={columns} data={students} />
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
            Schedule Meeting
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              // Use TextField directly for input
              slotProps={{
                textField: { fullWidth: true, variant: "outlined" },
              }}
              label="Select Date & Time"
              value={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              minTime={new Date()}
              minDateTime={new Date()}  // Restrict past dates and times
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="primary"
            onClick={handleScheduleMeeting}
            style={{ marginTop: 16 }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EnrolledStudents;
