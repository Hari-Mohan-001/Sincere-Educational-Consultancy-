import { Route, Routes } from "react-router-dom";
import AdminRoute from "./Routes/AdminRoute";
import CounsellorRoute from "./Routes/CounsellorRoute";
import UserRoute from "./Routes/UserRoute";
import NotfoundPage from "./Pages/NotFound/NotfoundPage";

function App() {
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
