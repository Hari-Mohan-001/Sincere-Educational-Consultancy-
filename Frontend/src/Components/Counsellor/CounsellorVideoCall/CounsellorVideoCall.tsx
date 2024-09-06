import { useLocation } from "react-router-dom";
import VideoCallComponent from "../../Layout/VideoCallComponent";


interface LocationState {
  userId: string;
}

const CounsellorVideoCall = () => {
  const location = useLocation();
  const { userId } = location.state as LocationState;

  if (!userId ) {
    return <div>Error: Missing required parameters</div>;
  }

  // const roomId = `${counsellorId}-${userId}-${Date.now()}`;

  // useEffect(() => {
  //   const roomLink = `${window.location.origin}/join-call/${roomId}`;
  //   console.log('roomlink',roomLink);
    
  //   const data = {
  //     userId: userId,
  //     roomLink: roomLink,
  //   };
  //   const sendMeetLink = async () => {
  //     // const response = await counsellorApi.sendVideoCallLink(data);
  //     // if (response) {
  //     //   toast.success("Link send successfully");
  //     // }
  //   };
  //   sendMeetLink();
  // }, []);
  return (
    <div>
      <h1 className="text-center text-xl">Counsellor Call</h1>
      <VideoCallComponent
      userId={userId}
      role="counsellor"
      />
    </div>
  );
};

export default CounsellorVideoCall;
