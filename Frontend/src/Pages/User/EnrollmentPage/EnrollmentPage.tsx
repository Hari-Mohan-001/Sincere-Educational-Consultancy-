import Footer from "../../../Components/Layout/Footer"
import Enrollment from "../../../Components/User/Enrolment/Enrollment"
import Header from "../../../Components/User/Header/Header"


const EnrollmentPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-grow">
        <Enrollment />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default EnrollmentPage