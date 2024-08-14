import AdminSignInPage from "../Pages/Admin/SignInPage/AdminSignInPage";
import StudentsListPage from "../Pages/Admin/Students Page/StudentsListPage";
import ListCountryPage from "../Pages/Admin/CountriesPage/ListCountryPage";
import { Route, Routes } from "react-router-dom";
import AddCountryPage from "../Pages/Admin/CountriesPage/AddCountryPage";
import UniversityListPage from "../Pages/Admin/UniversityPage/UniversityListPage";
import ListEnrollmentPage from "../Pages/Admin/AdminEnrollmentPage/ListEnrollmentPage";
import AddEnrollmentPage from "../Pages/Admin/AdminEnrollmentPage/AddEnrollmentPage";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminCourseListPage from "../Pages/Admin/AdminCourseListPage/AdminCourseListPage";
import NotApprovedUniversitiesPage from "../Pages/Admin/NotApprovedUniversitiesPage/NotApprovedUniversitiesPage";
import AdminNotFoundPage from "../Pages/Admin/AdminNotFoundPage/AdminNotFoundPage";
import AdminDashboardPage from "../Pages/Admin/Dashboard/AdminDashboardPage";
import { NavProvider } from "../Context/SideNavbarContext";
import AdminOrderPage from "../Pages/Admin/AdminOrderPage/AdminOrderPage";


const AdminRoute = () => {
  return (
    <NavProvider>
    <Routes>
      <Route path="signin" element={<AdminSignInPage />} />
      <Route element={<AdminPrivateRoute/>}>
      <Route path="dashboard" element={<AdminDashboardPage/>} />
      <Route path="students" element={<StudentsListPage />} />
      <Route path="countries" element={<ListCountryPage />} />
      <Route path="add-country" element={<AddCountryPage/>}/>
      <Route path="universities" element={<UniversityListPage/>}/>
      <Route path="enrollment" element={<ListEnrollmentPage/>}/>
      <Route path="add-enrollment" element={<AddEnrollmentPage/>}/>
      <Route path="courses" element={<AdminCourseListPage/>}/>
      <Route path="not-approved-universities" element={<NotApprovedUniversitiesPage/>}/>
      <Route path="orders" element={<AdminOrderPage/>}/>
      </Route>
      <Route path="*" element={<AdminNotFoundPage />} />
    </Routes>
    </NavProvider>
  );
};

export default AdminRoute;
