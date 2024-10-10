import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminRootState } from "../../../Interface/Admin/AdminInterface";
import { useEffect } from "react";
import { signOutAdmin } from "../../../Redux/Admin/AdminSlice";
import { Button } from "@mui/material";
import { adminApi } from "../../../Api/adminApi";

const Header = () => {
  const { admin } = useSelector((state: AdminRootState) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate("/admin/signin");
    }
  }, [admin, navigate]);

  const handleSignout = async () => {
    await adminApi.signOut();
    dispatch(signOutAdmin());
    navigate("/admin/signin");
    toast.success("Signed out successfully");
  };

  return (
    <div className="bg-gray-800 w-full px-4 py-3 shadow-xl border">
      <div className="flex justify-between items-center">
        {/* Left Side: Logo */}
        <h1 className="text-white text-lg font-bold">SeC</h1>

        {/* Right Side: Admin Info */}
        {admin && (
          <div className="flex items-center space-x-4">
            <h1 className="text-white text-sm">{admin?.name}</h1>
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={admin && admin.image ? admin.image : undefined}
              alt="profile"
            />
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleSignout}
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
