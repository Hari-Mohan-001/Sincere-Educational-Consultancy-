
import Header from "../../../Components/Counsellor/Header/Header";
import SideNavBar from "../../../Components/Counsellor/SideNavBar/SideNavBar";
import ListUniversity from "../../../Components/Counsellor/University/ListUniversity";

const UniversityPage = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <SideNavBar />
        <ListUniversity />
      </div>
    </>
  );
};

export default UniversityPage;
