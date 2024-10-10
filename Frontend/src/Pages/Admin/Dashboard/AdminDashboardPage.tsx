
import AdminDashboard from "../../../Components/Admin/Dashboard/AdminDashboard"
import Header from "../../../Components/Admin/Header/Header"
import SideNavBar from "../../../Components/Admin/SideNavBar/SideNavBar"


const AdminDashboardPage = () => {
   return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width Header */}
      <Header />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-1/5">
          <SideNavBar />
        </div>

        {/* Main Content: Student List */} 
        <div className="w-4/5 p-0">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage