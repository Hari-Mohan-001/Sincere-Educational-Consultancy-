import { Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";
import { userApi } from "../../../Api/userApi";

interface CounsellorData {
  _id: string;
  name: string;
}

interface EventData {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  enrollType: string;
  enrollImage: string;
  date: string;
  time: string;
  counsellor: CounsellorData;
}

const ListEvents = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (user) {
          const userId = user.id;
          const events = await userApi.getEvents(userId)
          if(events){
            setEvents(events)
          }else{
            setEvents([])
          }
        } else {
          navigate("/signIn");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  const [events, setEvents] = useState<EventData[]>([]);

  const handleChatClick = (CounsellorId: string) => {
    
    const counsellorId = CounsellorId;
    //navigate(`/chat/${userId}/${counsellorId}`)
    navigate(`/chat`, {
      state: { userId: user?.id, counsellorId: counsellorId },
    });
  };

  const columns = [
    { id: "userName", label: "Name", minWidth: 100 },
    { id: "userEmail", label: "Email", minWidth: 100 },
    { id: "enrollType", label: "Enroll Type", minWidth: 50 },
    {
      id: "enrollImage",
      label: "Image",
      minWidth: 100,
      render: (row: EventData) => (
        <img
          src={row.enrollImage}
          alt={row.enrollType}
          style={{ width: 80, height: 80 }}
        />
      ),
    },
    {
      id: "counsellorName",
      label: "Counsellor",
      minWidth: 100,
      render: (row: EventData) => row.counsellor.name,
    },
    { id: "date", label: "Date", minWidth: 100 },
    {
      id: "time",
      label: "Time",
      minWidth: 50,
    },
    {
      id: "action",
      label: "Action",
      minWidth: 100,
      render: (row: EventData) =>
        row.enrollType === "Chat" ? (
          <Button
            onClick={() => handleChatClick(row.counsellor._id)}
            variant="contained"
          >
            Chat
          </Button>
        ) : (
          <Button>Video call</Button>
        ),
    },
  ];

  return (
    <>
      <TableComponent title="Enrolled Events" columns={columns} data={events} />
      <div className="mt-4 mr-2">
        {/* <Button onClick={handleClick} variant="contained">
          Add
        </Button> */}
      </div>
    </>
  );
};

export default ListEvents;
