
import CountryListCard from '../../../Components/User/CounrtyCard/CountryCard'
import CourseListCard from '../../../Components/User/CourseCard/CourseCard'
import EnrollCard from '../../../Components/User/Enrollcard/EnrollCard'
import Header from '../../../Components/User/Header/Header'
import UniversityListCard from '../../../Components/User/UniversityCard/UniversityCard'

const HomePage = () => {
  return (
    <>
    <Header/>
    <EnrollCard/>
    <CountryListCard/>
    <UniversityListCard/>
    <CourseListCard/>
    </>
  )
}

export default HomePage