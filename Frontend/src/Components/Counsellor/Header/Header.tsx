import { useDispatch, useSelector } from "react-redux";
import { signOutCounsellor } from "../../../Redux/Counsellor/CounsellorSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CounsellorRootState } from "../../../Interface/Counsellor/CounsellorInterface";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { counsellorApi } from "../../../Api/counsellorApi";
import { useSocket } from "../../../Context/SocketContext";
import NotificationComponent from "../../Layout/NotificationComponent";

const Header = () => {
  const { counsellor } = useSelector(
    (state: CounsellorRootState) => state.counsellor
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {socket} = useSocket()
  useEffect(() => {
    if (!counsellor) {
      navigate("/counsellor/signin");
    }
  }, [counsellor, navigate]);

  const handleSignout = async () => {
     await counsellorApi.signout();
     socket?.emit('logoutChangeStatus', counsellor?.id, 'counsellor')
    dispatch(signOutCounsellor());
    navigate("/counsellor/signin");
    toast.success("Signout Successfully");
  };
  return (
    <div className="bg-cyan-950 border shadow-xl">
      <div className="flex justify-between items-center max max-w-7xl mx-auto p-3">
        <h1 className="font-bold">SeC</h1>
        <ul className="flex gap-4">
          {/* <li className="cursor-pointer" onClick={handleSignout}>SignOut</li> */}
          {counsellor && <NotificationComponent role="counsellor"/>}
          <h1 className="rounded-full text-white mt-2">{counsellor?.name}</h1>
          <img
            className="w-7 h-7 mt-2 rounded-full object-cover"
            src={counsellor && counsellor.image ? counsellor.image : undefined}
            alt="image"
          />
          <Button
            onClick={handleSignout}
            variant="contained"
            className="!bg-violet-900"
          >
            SignOut
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
