import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { URL } from "../../../Constants/Constants"
import { useSelector } from "react-redux"
import { RootState } from "../../../Interface/User/UserInterface"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { toast } from "react-toastify"

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

const AllCourses = () => {

  const {user} = useSelector((state:RootState)=>state.user)
  const [courses, setCourses] = useState<CourseData[]>([]);
  const[err,setErr]= useState<string>("")
  const navigate = useNavigate()
  useEffect(()=>{
    const getAllCourses = async()=>{
  try {
   
    
     const response = await axios.get(`${URL}/courses`,{
        withCredentials:true
     })
     
     const courses = response.data.data
     setCourses(courses)

  } catch (error) {
    if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
            toast.error(error.response.data.message)
          setErr(error.response.data.message); // Assuming the backend sends the error message in 'message'
        } else {
          setErr(error.message);
        }
      } else {
        console.log('elseerr', error);
      }
    
  }
}
getAllCourses()
  },[])

  const handleClick = (courseId:string)=>{
    navigate(`/courseDetails/${courseId}`)
  }
  return (
    <div className="flex flex-col items-center mt-5 w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Courses</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-10 ml-16 mr-16">
        {courses.map((course) => (
          <div key={course.id} className="flex flex-col items-center  sm:w-1/4 lg:w-1/4 p-2">
           
            <img className="w-96 h-60  shadow-2xl border rounded-lg" src={course.logo} alt={course.name} />
            <Button onClick={ ()=>handleClick(course.id)} variant="outlined">{course.name}</Button>
          </div>
          
        ))}
        
      </div>
    </div>
  )
}

export default AllCourses 