
import Header from "../../../Components/Counsellor/Header/Header";
import SideNavBar from "../../../Components/Counsellor/SideNavBar/SideNavBar";
import ListUniversity from "../../../Components/Counsellor/University/ListUniversity";

const UniversityPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5 ">
          <SideNavBar />
        </div>

        {/* Main Content: Student List */} 
        <div className="w-4/5 p-0">
          <ListUniversity />
        </div>
      </div>
    </div>
  );
};

export default UniversityPage;
