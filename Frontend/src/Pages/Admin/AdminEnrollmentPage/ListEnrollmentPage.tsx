import ListEnrollment from "../../../Components/Admin/Enrollment/ListEnrollment"
import Header from "../../../Components/Admin/Header/Header"
import SideNavBar from "../../../Components/Admin/SideNavBar/SideNavBar"


const ListEnrollmentPage = () => {
  return (
    <>
    <Header />
    <div className="flex">
      <SideNavBar />
      <ListEnrollment />
    </div>
  </>
  )
}

export default ListEnrollmentPage