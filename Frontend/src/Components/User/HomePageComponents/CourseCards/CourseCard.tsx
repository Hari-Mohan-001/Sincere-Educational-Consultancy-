import axios from "axios";
import { useEffect, useState } from "react"
import { URL } from "../../../../Constants/Constants";
import { Link } from "react-router-dom";

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
const CourseCard = () => {

    useEffect(() => {
        const getDomains = async () => {
          try {
            const response = await axios.get(`${URL}/Courses`); 
            const data = response.data;
            console.log("dom", data);
    
            setCourses(data.data);
          } catch (error) {
            console.log(error);
            // setError(error)
          }
        };
        getDomains();
      }, []);
      const[courses,setCourses] = useState<CourseData[]>()
  return (

    <div className="mt-9">
      <h1 className="text-center text-2xl font-bold">Courses offered</h1>
      <div className="flex flex-wrap justify-around mt-12 p-1 bg-cyan-500 rounded-lg shadow-xl ml-10 mr-10">
        {courses?.map((course) => (
          <div
            key={course.id}
            className="flex flex-col items-center m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/5"
          >
            <div className="flex justify-center">
              <img className="w-52 h-48 rounded-lg" src={course.logo} alt={course.name} />
            </div>
            <div className="mt-3">
              <button className="bg-slate-400 font-medium text-black rounded-lg px-4 py-2">
                {course.name}
              </button>
            </div>
          </div>
        ))}
        <Link to={"/courses"}><p className="underline">See more</p></Link>
      </div>
      
    </div>
  );
}

export default CourseCard