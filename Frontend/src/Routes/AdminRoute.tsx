import AdminSignInPage from "../Pages/Admin/SignInPage/AdminSignInPage";
import AdminDashboard from "../Pages/Admin/Dashboard/AdminDashboard";
import StudentsListPage from "../Pages/Admin/Students Page/StudentsListPage";
import ListCountryPage from "../Pages/Admin/CountriesPage/ListCountryPage";
import { Route, Routes } from "react-router-dom";
import AddCountryPage from "../Pages/Admin/CountriesPage/AddCountryPage";
import UniversityListPage from "../Pages/Admin/UniversityPage/UniversityListPage";
import ListEnrollmentPage from "../Pages/Admin/AdminEnrollmentPage/ListEnrollmentPage";
import AddEnrollmentPage from "../Pages/Admin/AdminEnrollmentPage/AddEnrollmentPage";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/admin/signin" element={<AdminSignInPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<StudentsListPage />} />
      <Route path="/admin/countries" element={<ListCountryPage />} />
      <Route path="/admin/add-country" element={<AddCountryPage/>}/>
      <Route path="/admin/universities" element={<UniversityListPage/>}/>
      <Route path="/admin/enrollment" element={<ListEnrollmentPage/>}/>
      <Route path="/admin/add-enrollment" element={<AddEnrollmentPage/>}/>
    </Routes>
  );
};

export default AdminRoute;
