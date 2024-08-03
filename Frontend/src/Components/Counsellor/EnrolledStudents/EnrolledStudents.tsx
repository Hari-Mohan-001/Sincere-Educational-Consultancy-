import {  Button, Modal, Typography } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { COUNSELLORBASEURL} from "../../../Constants/Constants";
import { CounsellorRootState } from "../../../Interface/Counsellor/CounsellorInterface";
import { useSelector } from "react-redux";          
import { format } from "date-fns";
import { toast } from "react-toastify";
import io, { Socket } from 'socket.io-client';


interface OrderData{
_id:string,
userId:string,
userName:string,
userEmail:string,
enrollType:string,
enrollImage:string
meetingSchedule?: { date: string; time: string };
}

const EnrolledStudents = () => {
  const navigate = useNavigate();
  const { counsellor } = useSelector(
    (state: CounsellorRootState) => state.counsellor
  );
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        if (counsellor) {
          const countryId = counsellor.country;
          const response = await axios.get(`${COUNSELLORBASEURL}/orders/${countryId}`,{
            withCredentials:true
          });
          setStudents(response.data.data);
        } else {
          navigate("/counsellor/signin")
        }
      } catch (error) {
        console.error(error);
      }
    };

    const newSocket:Socket = io('http://localhost:3001');
    setSocket(newSocket);
    fetchEnrolledStudents();
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const [students, setStudents] = useState<OrderData[]>([]);
  const[open,setOpen] = useState<boolean>(false)
  const[selectedStudent, setSelectedStudent] = useState<OrderData |null>(null)
  const[selectedDate, setSelectedDate] = useState<Date |null>(new Date())
  



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

    console.log(selectedDate , selectedStudent);
    
    try {
      //create event for the meeting as per the details entered 
      const dateObject = new Date(selectedDate)
      const date = format(dateObject,'dd-MM-yyyy')
      const time = format(dateObject,'HH:mm:ss')
      const orderId = selectedStudent._id
      
      const details = {
        date: date,
        time:time,
        userId:selectedStudent.userId,
        userName:selectedStudent.userName,
        userEmail:selectedStudent.userEmail,
        enrollType:selectedStudent.enrollType,
        enrollImage:selectedStudent.enrollImage,
        selectedDate,
        counsellorId:counsellor?.id,
        orderId:orderId
      }
      const response = await axios.post(
        `${COUNSELLORBASEURL}/event`,
        details,
       {
          withCredentials:true
        }
      );
      if(response.status===200){
         // Update the student with the scheduled meeting details
         setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.userId === selectedStudent.userId
              ? { ...student, scheduledMeeting: { date, time } }
              : student
          )
        );
        toast.success("Meeting scheduled successfully")
      }
      console.log("Meeting scheduled:", response.data);
      // Optionally update the UI or notify the user
    } catch (error) {
      console.error("Error scheduling meeting:", error);
    }

    setOpen(false);
  };

  const handleChatClick = (student: OrderData) => {
    navigate(`/counsellor/chat/${counsellor?.id}/${student.userId}`)
    setSelectedStudent(student);
  };


  const handleVideoCallClick =(studentId:string)=>{
    if(socket){
      socket.emit('startCall', { to: studentId });
      navigate(`/counsellor/video-call/${counsellor?.id}/${studentId}`)
    }
   
  }

  const columns = [
    { id: "userName", label: "Name", minWidth: 100 },
    { id: "userEmail", label: "Email", minWidth: 100 },
    { id: "enrollType", label: "Enroll Type", minWidth: 50 },
    {
      id: "logo",
      label: "Logo",
      minWidth: 100,
      render: (row: OrderData) => (
        <img src={row.enrollImage} alt={row.enrollType} style={{ width: 80, height: 80 }} />
      ),
    },
    {
      id: "meeting",
      label: "Meeting",
      minWidth: 100,
      render: (row:OrderData) => (
        row.meetingSchedule?.date==="" && row.meetingSchedule.time==="" ? (

          <Button
            variant="contained"
            color="success"
            onClick={() => handleScheduleClick(row)}
          >
            Schedule
          </Button>
         
        ) : (
          <div>
          <div>Date: {row.meetingSchedule?.date}</div>
          <div>Time: {row.meetingSchedule?.time}</div>
        </div>
        )
      ),
    },
    {
      id: "chat",
      label: "Chat/Call",
      minWidth: 100,
      render: (row: OrderData) => (
        row.enrollType==='Chat'?
        <Button variant="contained" onClick={() => handleChatClick(row)}>Chat</Button> :
        <Button variant="contained" onClick={() => handleVideoCallClick(row.userId)} >Video Call</Button>
      ),
    },
  ];

  return (
    <>
      <TableComponent title="Students" columns={columns} data={students}/>
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
