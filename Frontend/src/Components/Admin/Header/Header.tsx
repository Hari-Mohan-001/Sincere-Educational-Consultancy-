
import axios from "axios";
import { ADMIN_BASE_URL} from "../../../Constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { signOutCounsellor } from "../../../Redux/Counsellor/CounsellorSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminRootState } from "../../../Interface/Admin/AdminInterface";
import { useEffect } from "react";
import { signOutAdmin } from "../../../Redux/Admin/AdminSlice";



const Header = () => {
  const { admin } = useSelector(
    (state: AdminRootState) => state.admin
  );
  const dispatch = useDispatch()
    const navigate = useNavigate()
     
      useEffect(()=>{
        if(!admin){
          navigate("/admin/signin")
        }
      },[admin,navigate])

    
    
     const handleSignout = async ()=>{
     const response =  await axios.get(`${ADMIN_BASE_URL}/signout`,{
      withCredentials: true,
     })
     console.log(response.data);
     
      dispatch(signOutAdmin())
       navigate("/admin/signin")
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
    