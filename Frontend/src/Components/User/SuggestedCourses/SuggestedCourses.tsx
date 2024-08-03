import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { BASE_URL } from "../../../Constants/Constants"
import { useSelector } from "react-redux"
import { RootState } from "../../../Interface/User/UserInterface"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

interface CourseData {
  id:string
  name: string;
  qualification: string;
  fees: string;
  description: string;
  duration: string;
  university: string[];
  domain: string;
  logo: string;
}

const SuggestedCourse = () => {

  const {user} = useSelector((state:RootState)=>state.user)
  const [suggestedCourses, setSuggestedCourses] = useState<CourseData[]>([]);
  const[err,setErr]= useState<string>("")
  const navigate = useNavigate()
  useEffect(()=>{
    const getSuggestedCourses = async()=>{
  try {
    const qualification = user?.qualification
   
    
     const response = await axios.get(`${BASE_URL}/courses/${qualification}`,{
        withCredentials:true
     })
     
     const courses = response.data.data
   
     
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

  const handleClick = (courseId:string)=>{
    navigate(`/courseDetails/${courseId}`)
  }
  return (
    <div className="flex flex-col items-center mt-5 w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Suggested Courses</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-10 ml-16 mr-16">
        {suggestedCourses.map((courses) => (
          <div key={courses.id} className="flex flex-col items-center  sm:w-1/4 lg:w-1/4 p-2">
           
            <img className="w-96 h-60  shadow-2xl border rounded-lg" src={courses.logo} alt={courses.name} />
            <Button onClick={ ()=>handleClick(courses.id)} variant="outlined">{courses.name}</Button>
          </div>
          
        ))}
        
      </div>
    </div>
  )
}

export default SuggestedCourse 