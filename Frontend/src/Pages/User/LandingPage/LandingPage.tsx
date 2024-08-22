import Banner from "../../../Components/User/LandingPageComponents/Banner/Banner"
import Header from "../../../Components/User/Header/Header"
import Success from "../../../Components/User/LandingPageComponents/Success/Success"
import About from "../../../Components/User/LandingPageComponents/About/About"
import Country from "../../../Components/User/LandingPageComponents/Country/Country"
import Career from "../../../Components/User/LandingPageComponents/Career/Career"
import Features from "../../../Components/User/LandingPageComponents/Features/Features"
import Footer from "../../../Components/Layout/Footer"
import Specialities from "../../../Components/User/LandingPageComponents/Specialities/Specialities"



const LandingPage = () => {
  return (
    <>
    <Header/>
    <Banner/>
    <Success/>
    <About/>
    <Country/>
    <Specialities/>
    <Career/>
    <Features/>
    <Footer/>
   
    </>
  )
}

export default LandingPage