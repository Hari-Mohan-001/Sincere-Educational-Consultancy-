
import AdminDashboard from "../../../Components/Admin/Dashboard/AdminDashboard"
import Header from "../../../Components/Admin/Header/Header"
import SideNavBar from "../../../Components/Admin/SideNavBar/SideNavBar"


const AdminDashboardPage = () => {
  return (
    <div>
        <Header/>
        <div className="flex">
          <div>
          <SideNavBar/>
          </div>
        <div className="w-4/5">
        <AdminDashboard/>
        </div>
        
        </div>
        
    </div>
  )
}

export default AdminDashboardPage