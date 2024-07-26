import Header from "../../../Components/Admin/Header/Header"
import SideNavBar from "../../../Components/Admin/SideNavBar/SideNavBar"
import StudentList from "../../../Components/Admin/Students/StudentsList"

const StudentsListPage = () => {
  return (
    <div>
      <Header/>
      <div className="flex ">
        <div>
        <SideNavBar/>
        </div>
      <StudentList/>
      </div>
      
      
    </div>
  )
}

export default StudentsListPage