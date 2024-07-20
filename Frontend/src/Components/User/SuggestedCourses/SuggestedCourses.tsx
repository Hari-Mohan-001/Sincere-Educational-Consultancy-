import { useEffect, useState } from "react"
import Header from "../../../Components/User/Header/Header"
import axios, { AxiosError } from "axios"
import { BASE_URL } from "../../../Constants/Constants"
import { useSelector } from "react-redux"
import { RootState } from "../../../Interface/User/UserInterface"

interface CourseData {
  name?: string;
  qualification?: string;
  fees?: string;
  description?: string;
  duration?: string;
  university?: string;
  domain?: string;
  logo?: string;
}

const SuggestedCourse = () => {

  const {user} = useSelector((state:RootState)=>state.user)
  const [suggestedCourses, setSuggestedCourses] = useState<CourseData[]>([]);
  const[err,setErr]= useState<string>("")
  useEffect(()=>{
    const getSuggestedCourses = async()=>{
  try {
    const qualification = user?.qualification
     const response = await axios.get(`${BASE_URL}/courses/${qualification}`,{
        withCredentials:true
     })
     
     const courses = response.data.data
     console.log('sgst', courses);
     
     setSuggestedCourses(courses)

  } catch (error) {
    if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          setErr(error.response.data.message); // Assuming the backend sends the error message in 'message'
        } else {
          setErr(error.message);
        }
      } else {
        console.log('elseerr', error);
      }
    
  }
}
getSuggestedCourses()
  },[])
  return (
    <div>
      <h1>course in page</h1>
      {err && <p>{err}</p>}
    </div>
  )
}

export default SuggestedCourse 