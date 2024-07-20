
import CourseListCard from '../../../Components/User/CourseCard/CourseCard'
import EnrollCard from '../../../Components/User/HomePageComponents/Enrollcard/EnrollCard'
import Header from '../../../Components/User/Header/Header'
import UniversityListCard from '../../../Components/User/UniversityCard/UniversityCard'

import DomainCard from '../../../Components/User/HomePageComponents/DomainCards/DomainCard'
import CountryCards from '../../../Components/User/HomePageComponents/CountryCards/CountryCards'
import UniversityCard from '../../../Components/User/HomePageComponents/UniversityCards/UniversityCard'
import SuggestionButton from '../../../Components/User/HomePageComponents/SuggestionButton/SuggestionButton'

const HomePage = () => {
  return (
    <>
    <Header/>
    <EnrollCard/>
    <DomainCard/>
    <CountryCards/>
    <UniversityCard/>
    <SuggestionButton/>
    <CourseListCard/>
    </>
  )
}

export default HomePage