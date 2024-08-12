import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { URL } from "../../../Constants/Constants"
import { useNavigate, useParams } from "react-router-dom"
import { Button,Pagination} from "@mui/material"
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

  const [courses, setCourses] = useState<CourseData[]>([]);
  const[err,setErr]= useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 6;
  const navigate = useNavigate()
  const { domainId } = useParams<{ domainId?: string }>();
  useEffect(()=>{
    const getAllCourses = async()=>{
      try {
        let response;
        if (domainId) {
          response = await axios.get(`${URL}/courses/${domainId}`, {
            withCredentials: true,
          });
          console.log('dom',response.data);
          
        } else {
          response = await axios.get(`${URL}/courses`, {
            withCredentials: true,
          });
        }
        const courses = response.data.data;
        setCourses(courses);

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

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex flex-col items-center w-full bg-cyan-800 shadow-slate-800">
      <div className="mb-4">
      <h1 className="text-3xl font-semibold mt-5 underline">
          {domainId ? `Courses` : "All Courses"}
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-10 ml-16 mr-16">
        {currentCourses.map((course) => (
          <div key={course.id} className="flex flex-col items-center  sm:w-1/4 lg:w-1/4 p-2">
           
            <img className="w-96 h-60  shadow-2xl border rounded-lg cursor-pointer" src={course.logo} alt={course.name} onClick={ ()=>handleClick(course.id)} />
            <Button onClick={ ()=>handleClick(course.id)} variant="text" sx={{color:'white'}}>{course.name}</Button>
          </div>
          
        ))}
        
      </div>
      <Pagination
        count={Math.ceil(courses.length / coursesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 4 }}
      />
    </div>
  )
}

export default AllCourses 