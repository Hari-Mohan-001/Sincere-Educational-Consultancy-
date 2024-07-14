// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import axios from "axios";
import { COUNSELLORBASEURL } from "../../../Constants/Constants";
import { useDispatch } from "react-redux";
import { signOutCounsellor } from "../../../Redux/Counsellor/CounsellorSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const Header = () => {
   
     
    //   useEffect(()=>{
    //     if(!adminDetails){
    //       navigate("/admin/signIn")
    //     }
    //   },[adminDetails,navigate])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
     const handleSignout = async ()=>{
      console.log('outfrnt');
      
     const response =  await axios.get(`${COUNSELLORBASEURL}/signout`,{
      withCredentials: true,
     })
     console.log(response.data);
     
      dispatch(signOutCounsellor())
       navigate("/counsellor/signin")
       toast.success("Signout Successfully")
     }
      return (
        <div className="bg-gray-600">
          <div className="flex justify-between items-center max max-w-7xl mx-auto p-3">
            <h1 className="font-bold">SeC</h1>
            <ul className="flex gap-4">
              <li className="cursor-pointer" onClick={handleSignout}>SignOut</li>
    
              {/* <img
                className="w-7 h-7 rounded-full object-cover"
                src={adminDetails && adminDetails.profileImage}
                alt="image"
              /> */}
            </ul>
          </div>
        </div>
      );
    };
    
    export default Header;
    