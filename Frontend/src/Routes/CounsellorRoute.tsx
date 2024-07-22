
import { Route, Routes } from 'react-router-dom'
import UniversityPage from '../Pages/Counsellor/UniversityPage/UniversityPage'
import AddUniversityPage from '../Pages/Counsellor/UniversityPage/AddUniversityPage'
import CounsellorSignUpPage from '../Pages/Counsellor/CousellorSignUpPage/CounsellorSignUpPage'
import CounsellorSignInPage from '../Pages/Counsellor/CounsellorSignInPage/CounsellorSignInPage'
import AddCoursePage from '../Pages/Counsellor/CoursesPage/AddCoursePage'
import AddDomainPage from '../Pages/Counsellor/DomainPage/AddDomainPage'
import DomainListPage from '../Pages/Counsellor/DomainPage/DomainListPage'
import ListCounsellorCoursePage from '../Pages/Counsellor/CoursesPage/ListCounsellorCoursePage'

const CounsellorRoute = () => {
  return (
   <Routes>
    <Route path='/counsellor/signup' element={<CounsellorSignUpPage/>}/>
    <Route path='/counsellor/signin' element={<CounsellorSignInPage/>}/>
    <Route path='/counsellor/university' element={<UniversityPage/>}/>
    <Route path='/counsellor/add-university' element={<AddUniversityPage/>}/>
    <Route path='/counsellor/add-course' element={<AddCoursePage/>}/>
    <Route path='/counsellor/add-domain' element={<AddDomainPage/>}/>
    <Route path='/counsellor/domain' element={<DomainListPage/>}/>
    <Route path='/counsellor/courses' element={<ListCounsellorCoursePage/>}/>
  
   </Routes>
  )
}  

export default CounsellorRoute