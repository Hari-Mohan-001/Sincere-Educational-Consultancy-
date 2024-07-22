import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { URL } from "../../../Constants/Constants"
import { CourseData } from "../../../Interface/Course/CourseData"
import { UniversityData } from "../../../Interface/University/UniversityData"
import { Button } from "@mui/material"




const CourseDetails = () => {

  const {courseId} = useParams()
  const[course, setCourse] = useState<CourseData>()
  const[universities, setUniversities] = useState<UniversityData[]>([])
  const navigate = useNavigate()

  useEffect(()=>{
    console.log('crsid',courseId);
    try {
      const fetchCourse = async()=>{
        const response = await axios.get(`${URL}/course/${courseId}`)   
        console.log(response.data.data);
        if(response.status===200){
          const course = response.data.data
          setCourse(course)
        } 
       }

       const fetchUniversities = async()=>{
        console.log('unicall',courseId);
        
        const response = await axios.get(`${URL}/universities-course/${courseId}`)
        console.log('fetuni',response.data.data);
        if(response.status===200){
          const universities = response.data.data
          setUniversities(universities)
        } 
       }
       fetchCourse()
       fetchUniversities()
    } catch (error) {
      console.log(error);
      
    }
    
        
  },[])

  const handleClick = (universityId:string)=>{
    console.log(universityId);
    
          navigate(`/universityDetails/${universityId}`)
  }
  return (
    <section className="bg-slate-100">
    <div className="flex justify-center">
      <div className="w-2/3 h-auto bg-indigo-200 mt-5 rounded-md">
      <div className="flex p-5 max-h-72">
        <div>
          <img className="rounded-lg shadow-md h-60" src={course?.logo} alt="" />
        </div>
        <div className="flex items-center ml-10">
          <h1 className="text-3xl font-bold">{course?.name}</h1>
        </div>
        
      </div>

      <div className="flex flex-col p-3">
        <div className="max-w-2xl">
          <p className="font-medium">{course?.description}</p>
        </div>
        <div>
          <p>Duration: {course?.duration}</p>
        </div>
        <div>
          <p>Fees: {course?.fees}</p>
        </div>
        <div>
          <p>Qualification: {course?.qualification}</p>
        </div>

      </div>

      </div>
    </div>
            <div className="flex justify-center mt-6">
            <h1 className="text-2xl underline">Universities which offer this course</h1>
            </div>
       <div className="flex flex-col items-center justify-center">
    {universities.map((university)=>{
    return  <div key={university._id} className=" w-2/5 h-auto border mt-5 rounded-md shadow-2xl">
      <div className="flex p-5 w-full">
        <div className="">
          <img className="rounded-lg shadow-md" src={university.logo} alt="" />
        </div>
        <div className="flex items-center ml-10">
          <h1 className="text-3xl font-bold">{university.name}</h1>
        </div>
        
      </div>

      <div className="flex flex-col p-3">
        <div className="max-w-2xl">
          <p>Address: {university.address}</p>
        </div>
        <div>
          <p>Ranking: {university.ranking}</p>
        </div>
      </div>
      <div className="p-3">
      <Button onClick={()=> handleClick(university._id)} variant="outlined" color="inherit">Show More</Button>
      </div>
       
      </div>

    })}
      
    </div>
    </section>
  )
}

export default CourseDetails