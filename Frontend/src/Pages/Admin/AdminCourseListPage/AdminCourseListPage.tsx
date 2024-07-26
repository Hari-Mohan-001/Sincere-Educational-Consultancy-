
import Header from '../../../Components/Admin/Header/Header'
import SideNavBar from '../../../Components/Admin/SideNavBar/SideNavBar'
import AdminCourseList from '../../../Components/Admin/Course/AdminCourseList'

const AdminCourseListPage = () => {
  return (
    <>
    <Header />
    <div className="flex">
      <div>
      <SideNavBar />
      </div>
      
      <AdminCourseList />
    </div>
  </>
  )
}

export default AdminCourseListPage