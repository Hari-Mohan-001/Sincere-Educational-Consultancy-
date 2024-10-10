
import Header from "../../../Components/Counsellor/Header/Header";
import SideNavBar from "../../../Components/Counsellor/SideNavBar/SideNavBar";
import DomainList from "../../../Components/Counsellor/Domain/ListDomain";

const DomainListPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Header />

      <div className="flex">
        
        <div className="w-1/5 ">
          <SideNavBar />
        </div>

        
        <div className="w-4/5 p-0">
          <DomainList />
        </div>
      </div>
    </div>
  );
};

export default DomainListPage;
