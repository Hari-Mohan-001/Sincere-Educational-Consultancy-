
import Header from '../../../Components/Admin/Header/Header'
import SideNavBar from '../../../Components/Admin/SideNavBar/SideNavBar'
import AdminCourseList from '../../../Components/Admin/Course/AdminCourseList'

const AdminCourseListPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5">
          <SideNavBar />
        </div>

        {/* Main Content: Student List */}
        <div className="w-4/5 p-0">
          <AdminCourseList />
        </div>
      </div>
    </div>
  );
}

export default AdminCourseListPage