

import EnrollCard from '../../../Components/User/HomePageComponents/Enrollcard/EnrollCard'
import Header from '../../../Components/User/Header/Header'
import DomainCard from '../../../Components/User/HomePageComponents/DomainCards/DomainCard'
import CountryCards from '../../../Components/User/HomePageComponents/CountryCards/CountryCards'
import UniversityCard from '../../../Components/User/HomePageComponents/UniversityCards/UniversityCard'
import SuggestionButton from '../../../Components/User/HomePageComponents/SuggestionButton/SuggestionButton'
import CourseCard from '../../../Components/User/HomePageComponents/CourseCards/CourseCard'

const HomePage = () => {
  return (
    <div>
    <Header/>
    <EnrollCard/>
    <DomainCard/>
    <CountryCards/>
    <UniversityCard/>
    <CourseCard/>
    <SuggestionButton/>
    </div>
  )
}

export default HomePage