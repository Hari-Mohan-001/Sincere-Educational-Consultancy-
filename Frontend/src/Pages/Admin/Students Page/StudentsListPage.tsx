import Header from "../../../Components/Admin/Header/Header";
import SideNavBar from "../../../Components/Admin/SideNavBar/SideNavBar";
import StudentList from "../../../Components/Admin/Students/StudentsList";

const StudentsListPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width Header */}
      <Header />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-1/4">
          <SideNavBar />
        </div>

        {/* Main Content: Student List */}
        <div className="w-3/4 p-4">
          <StudentList />
        </div>
      </div>
    </div>
  );
};

export default StudentsListPage;
