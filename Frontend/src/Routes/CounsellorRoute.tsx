
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

const CounsellorRoute = () => {
  return (
   <Routes>
    <Route path='/counsellor/signup' element={<CounsellorSignUpPage/>}/>
    <Route path='/counsellor/signin' element={<CounsellorSignInPage/>}/>
    <Route element={<CounsellorPrivateRoute/>}>
    <Route path='/counsellor/university' element={<UniversityPage/>}/>
    <Route path='/counsellor/add-university' element={<AddUniversityPage/>}/>
    <Route path='/counsellor/add-course' element={<AddCoursePage/>}/>
    <Route path='/counsellor/add-domain' element={<AddDomainPage/>}/>
    <Route path='/counsellor/domain' element={<DomainListPage/>}/>
    <Route path='/counsellor/courses' element={<ListCounsellorCoursePage/>}/>
    <Route path='/counsellor/students' element={<EnrolledStudentsPage/>}/>
    <Route path='/counsellor/chat/:counsellorId/:userId' element={<CounsellorChatPage/>}/>
    <Route path='/counsellor/video-call/:counsellorId/:userId' element={<CounsellorVideoCallPage/>}/>
    </Route>
   </Routes>
  )
}  

export default CounsellorRoute