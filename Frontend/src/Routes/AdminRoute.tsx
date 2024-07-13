import AdminSignInPage from "../Pages/Admin/SignInPage/AdminSignInPage";
import AdminDashboard from "../Pages/Admin/Dashboard/AdminDashboard";
import StudentsListPage from "../Pages/Admin/Students Page/StudentsListPage";
import ListCountryPage from "../Pages/Admin/CountriesPage/ListCountryPage";
import Sample from "../Components/Sample";
import { Route, Routes } from "react-router-dom";
import AddCountryPage from "../Pages/Admin/CountriesPage/AddCountryPage";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/admin/signin" element={<AdminSignInPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<StudentsListPage />} />
      <Route path="/sample" element={<Sample />} />
      <Route path="/admin/countries" element={<ListCountryPage />} />
      <Route path="/admin/add-country" element={<AddCountryPage/>}/>
    </Routes>
  );
};

export default AdminRoute;
