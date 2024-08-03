import { useParams } from "react-router-dom";
import VideoCallComponent from "../../Layout/VideoCallComponent";
import { useEffect } from "react";
import axios from "axios";
import { COUNSELLORBASEURL } from "../../../Constants/Constants";
import { toast } from "react-toastify";

const CounsellorVideoCall = () => {
  const { counsellorId, userId } = useParams();
  if (!userId || !counsellorId) {
    return <div>Error: Missing required parameters</div>;
  }

  const roomId =`${counsellorId}-${userId}-${Date.now()}`;
  useEffect(() => {
    const roomLink = `${window.location.origin}/join-call/${roomId}`;
    const sendMeetLink = async () => {
      const response = await axios.post(
        `${COUNSELLORBASEURL}/send-meet-link`,
        {
          userId: userId,
          roomLink: roomLink,
        },
        { withCredentials: true }
      );
      if(response.status===200){
        toast.success("Link send successfully")
      }
    };
    sendMeetLink();
  }, []);
  return (
    <div>
      <h1 className="text-center text-xl">Counsellor Call</h1>
      <VideoCallComponent isCounsellor={true} userId={counsellorId} roomId={roomId} />
    </div>
  );
};

export default CounsellorVideoCall;
