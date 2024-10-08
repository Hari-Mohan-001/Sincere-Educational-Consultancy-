import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../../Context/SocketContext";
import { RootState } from "../../../../Interface/User/UserInterface";
import { useSelector } from "react-redux";

const EnrollCard = () => {
  const navigate = useNavigate();
  const {socket} = useSocket()
  const { user } = useSelector((state: RootState) => state.user);
const hasJoined = useRef(false)

  const handleClick = () => {
    navigate("/enrollment");
  };

  useEffect(()=>{
       if(socket && user && !hasJoined.current){
        socket.emit("join", user.id , "user")
        hasJoined.current = true
       }

       return()=>{
        socket?.off("join")
       }
  })
  return (
    <section className="flex justify-center items-center box-border">
      <div className="flex flex-col lg:flex-row lg:items-center h-auto lg:h-72 mt-16 p-5 sm:w-fit">
        <div className="w-full lg:w-1/2 p-4">
          <div className="mb-4">
            <h1 className="mb-4">
              Are you stuck in taking the{" "}
              <span className="text-cyan-500 font-semibold text-xl">
                next step ???
              </span>
            </h1>
            <div className="w-full lg:w-96">
              <h1 className="text-indigo-600 font-bold text-2xl">
                Enroll now for getting the online doubt session with our country
                counsellors. Clear your doubts & get a better understanding of
                your future career options. Avail the chat and video call
                facility
              </h1>
            </div>
          </div>
          <div>
            <button
              onClick={handleClick}
              className="bg-cyan-700 text-white rounded-2xl w-36 h-10"
            >
              Enroll Now
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <div className="h-72 lg:h-full">
            <img
              className="h-full w-full object-cover shadow-xl rounded-lg"
              src="../../../Images/online4.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrollCard;
