import Countries from "../../../Components/Admin/Country/Countries";
import Header from "../../../Components/Admin/Header/Header";
import SideNavBar from "../../../Components/Admin/SideNavBar/SideNavBar";

const ListCountryPage = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <div>
        <SideNavBar />
        </div>
        <Countries />
      </div>
    </>
  );
};

export default ListCountryPage;
