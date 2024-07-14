import AdminRoute from "./Routes/AdminRoute";
import CounsellorRoute from "./Routes/CounsellorRoute";
import UserRoute from "./Routes/UserRoute";

function App() {
  return (
    <>
      <UserRoute />
      <AdminRoute />
      <CounsellorRoute/>
    </>
  );
}

export default App;
