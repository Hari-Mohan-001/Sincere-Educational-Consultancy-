import CounsellorList from "../../../Components/Admin/Counsellors/CounsellorList"
import Header from "../../../Components/Admin/Header/Header"
import SideNavBar from "../../../Components/Admin/SideNavBar/SideNavBar"


const CounsellorPage = () => {
  return (
    <div>
    <Header />
    <div className="flex ">
      <div>
        <SideNavBar />
      </div>

      <div className="w-4/5">
        <CounsellorList />
      </div>
    </div>
  </div>
  )
}

export default CounsellorPage