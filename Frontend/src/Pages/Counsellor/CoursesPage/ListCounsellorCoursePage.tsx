
import Header from '../../../Components/Counsellor/Header/Header'
import SideNavBar from '../../../Components/Counsellor/SideNavBar/SideNavBar'
import ListCourse from '../../../Components/Counsellor/Course/ListCourse'

const ListCounsellorCoursePage = () => {
  return (
    <div>
        <Header/>
        <div className="flex">
        <SideNavBar />
        <ListCourse/>
      </div>
    </div>
  )
}

export default ListCounsellorCoursePage