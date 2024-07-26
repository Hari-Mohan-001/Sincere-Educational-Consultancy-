import Header from "../../../Components/Admin/Header/Header";
import SideNavBar from "../../../Components/Admin/SideNavBar/SideNavBar";
import ListNotApprovedUniversities from "../../../Components/Admin/University/ListNotApprovedUniversities";

const NotApprovedUniversitiesPage = () => {
  return (
    <div>
      <Header />
      <div className="flex ">
        <div>
          <SideNavBar />
        </div>

        <div className="w-4/5">
          <ListNotApprovedUniversities />
        </div>
      </div>
    </div>
  );
};

export default NotApprovedUniversitiesPage;
