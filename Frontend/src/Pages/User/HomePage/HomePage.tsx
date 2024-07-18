
import CourseListCard from '../../../Components/User/CourseCard/CourseCard'
import EnrollCard from '../../../Components/User/HomePageComponents/Enrollcard/EnrollCard'
import Header from '../../../Components/User/Header/Header'
import UniversityListCard from '../../../Components/User/UniversityCard/UniversityCard'
import Country from '../../../Components/User/LandingPageComponents/Country/Country'
import DomainCard from '../../../Components/User/HomePageComponents/DomainCards/DomainCard'

const HomePage = () => {
  return (
    <>
    <Header/>
    <EnrollCard/>
    <DomainCard/>
    <Country/>
    {/* <CountryListCard/> */}
    <UniversityListCard/>
    <CourseListCard/>
    </>
  )
}

export default HomePage