import AdminRoute from "./Routes/AdminRoute";
import CounsellorRoute from "./Routes/CounsellorRoute";
import UnProtectedRoutes from "./Routes/UnProtectedRoutes";
import UserRoute from "./Routes/UserRoute";

function App() {
  return (
    <>
    <UnProtectedRoutes/>
      <UserRoute />
      <AdminRoute />
      <CounsellorRoute/>
      
    </>
  );
}

export default App;
