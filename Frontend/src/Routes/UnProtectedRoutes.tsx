import { Route, Routes } from "react-router-dom"
import LandingPage from "../Pages/User/LandingPage/LandingPage"


const UnProtectedRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>}/>
    </Routes>
  )
}

export default UnProtectedRoutes