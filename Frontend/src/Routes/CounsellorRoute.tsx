
import { Route, Routes } from 'react-router-dom'
import UniversityPage from '../Pages/Counsellor/UniversityPage/UniversityPage'
import AddUniversityPage from '../Pages/Counsellor/UniversityPage/AddUniversityPage'
import CounsellorSignUpPage from '../Pages/Counsellor/CousellorSignUpPage/CounsellorSignUpPage'
import CounsellorSignInPage from '../Pages/Counsellor/CounsellorSignInPage/CounsellorSignInPage'
import AddCoursePage from '../Pages/Counsellor/CoursesPage/AddCoursePage'
import AddDomainPage from '../Pages/Counsellor/DomainPage/AddDomainPage'
import DomainListPage from '../Pages/Counsellor/DomainPage/DomainListPage'
import ListCounsellorCoursePage from '../Pages/Counsellor/CoursesPage/ListCounsellorCoursePage'
import CounsellorPrivateRoute from './CounsellorPrivateRoute'
import EnrolledStudentsPage from '../Pages/Counsellor/EnrolledStudentsPage/EnrolledStudentsPage'
import CounsellorChatPage from '../Pages/Counsellor/CounsellorChatPage/CounsellorChatPage'
import CounsellorVideoCallPage from '../Pages/Counsellor/CounsellorVideoCallPage/CounsellorVideoCallPage'
import CounsellorNotFoundPage from '../Pages/Counsellor/CounsellorNotFoundPage/CounsellorNotFoundPage'
import { NavProvider } from '../Context/SideNavbarContext'


const CounsellorRoute = () => {
  return (
    <NavProvider>
   <Routes>
    <Route path='signup' element={<CounsellorSignUpPage/>}/>
    <Route path='signin' element={<CounsellorSignInPage/>}/>
    <Route element={<CounsellorPrivateRoute/>}>
    <Route path='university' element={<UniversityPage/>}/>
    <Route path='add-university' element={<AddUniversityPage/>}/>
    <Route path='add-course' element={<AddCoursePage/>}/>
    <Route path='add-domain' element={<AddDomainPage/>}/>
    <Route path='domain' element={<DomainListPage/>}/>
    <Route path='courses' element={<ListCounsellorCoursePage/>}/>
    <Route path='students' element={<EnrolledStudentsPage/>}/>
    <Route path='chat/:counsellorId/:userId' element={<CounsellorChatPage/>}/>
    <Route path='video-call/:counsellorId/:userId' element={<CounsellorVideoCallPage/>}/>
    </Route>
    <Route path='*' element={<CounsellorNotFoundPage/>}/>
   </Routes>
   </NavProvider>
  )
}  

export default CounsellorRoute