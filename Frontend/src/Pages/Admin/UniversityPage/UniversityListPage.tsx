import Header from "../../../Components/Admin/Header/Header";
import SideNavBar from "../../../Components/Admin/SideNavBar/SideNavBar";
import AdminListUniversity from "../../../Components/Admin/University/ListUniversity";

const UniversityListPage = () => {
  return (
    <div>
      <Header />
      <div className="flex ">
        <div>
          <SideNavBar />
        </div>

        <div className="w-4/5">
          <AdminListUniversity />
        </div>
      </div>
    </div>
  );
};

export default UniversityListPage;
