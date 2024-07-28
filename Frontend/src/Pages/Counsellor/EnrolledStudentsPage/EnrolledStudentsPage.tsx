
import Header from '../../../Components/Counsellor/Header/Header'
import SideNavBar from '../../../Components/Counsellor/SideNavBar/SideNavBar'
import EnrolledStudents from '../../../Components/Counsellor/EnrolledStudents/EnrolledStudents'

const EnrolledStudentsPage = () => {
  return (
    <div>
        <Header/>
        <div className="flex">
          <div>
          <SideNavBar />
          </div>
        <EnrolledStudents/>
      </div>
    </div>
  )
}

export default EnrolledStudentsPage