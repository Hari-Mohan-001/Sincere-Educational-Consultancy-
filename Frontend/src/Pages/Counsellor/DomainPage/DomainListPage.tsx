
import Header from "../../../Components/Counsellor/Header/Header";
import SideNavBar from "../../../Components/Counsellor/SideNavBar/SideNavBar";
import DomainList from "../../../Components/Counsellor/Domain/ListDomain";

const DomainListPage = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <div>
          <SideNavBar />
        </div>
        <DomainList />
      </div>
    </>
  );
};

export default DomainListPage;
