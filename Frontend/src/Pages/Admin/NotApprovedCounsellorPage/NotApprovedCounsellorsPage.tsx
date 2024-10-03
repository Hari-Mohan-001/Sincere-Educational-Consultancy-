
import Header from '../../../Components/Admin/Header/Header'
import SideNavBar from '../../../Components/Admin/SideNavBar/SideNavBar'
import NotApprovedCounsellors from '../../../Components/Admin/Counsellors/NotApprovedCounsellors'

const NotApprovedCounsellorsPage = () => {
  return (
    <div>
    <Header />
    <div className="flex ">
      <div>
        <SideNavBar />
      </div>

      <div className="w-4/5">
        <NotApprovedCounsellors />
      </div>
    </div>
  </div>
  )
}

export default NotApprovedCounsellorsPage