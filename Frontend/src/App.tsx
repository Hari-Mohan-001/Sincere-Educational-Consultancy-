import { Route, Routes } from "react-router-dom";
import AdminRoute from "./Routes/AdminRoute";
import CounsellorRoute from "./Routes/CounsellorRoute";
import UserRoute from "./Routes/UserRoute";
import NotfoundPage from "./Pages/NotFound/NotfoundPage";
import { useSocket } from "./Components/Layout/GlobalSocket";

function App() {
  // function requestNotificationPermission() {
  //   if (Notification.permission !== 'granted') {
  //     Notification.requestPermission();
  //   }
  // }
  useSocket()
  return (
    <>
  
    <Routes>
      <Route path="/counsellor/*" element={<CounsellorRoute/>}/>
      <Route path="/admin/*" element={<AdminRoute />}/>
      <Route path="/*" element={<UserRoute />}/>
      
      </Routes>  
    </>
  );
}

export default App;
