
import { useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

interface Data{
    isCounsellor:boolean
    userId:string
    roomId:string
}


const VideoCallComponent = ({ isCounsellor,userId,roomId }:Data) => { 
  const navigate = useNavigate()

  const myMeeting = async (element:any) => {
    const appID = 1531440418;
    const serverSecret = "204fb99ea6b66e6f4f14257cb4fb05d2";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userId,
      isCounsellor ? 'Counsellor' : 'Student'
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Country Counsellor',
          url: window.location.href,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
      onLeaveRoom: () => {
        navigate(isCounsellor ? '/counsellor/students' : '/home');
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
};

export default VideoCallComponent;