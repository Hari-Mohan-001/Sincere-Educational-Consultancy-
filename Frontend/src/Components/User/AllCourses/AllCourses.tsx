import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Pagination } from "@mui/material";
import { toast } from "react-toastify";
import { api } from "../../../Api/api";

interface CourseData {
  id: string;
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
  const [filteredCourses, setFilteredCourses] = useState<
  CourseData[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 6;
  const navigate = useNavigate();

  const location = useLocation();
  const domainId = location.state?.domainId;

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        let response;
        if (domainId) {
          response = await api.getCoursesByDomain(domainId);
          console.log('domainiD')
        } else {
          response = await api.getCourses();
        }
        const courses = response;
        if (courses.length) {
          setCourses(courses);
        } else {
          setCourses([]);
        }
        console.log(courses);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.data) {
            toast.error(error.response.data.message);
           
          } else {
            console.log(error.message);
          }
        } else {
          console.log(error);
        }
      }
    };
    getAllCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      
    
      return (
        course.name.toLowerCase().includes(lowerCaseQuery)
       
      );
    });
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = (courseId: string) => {
    navigate(`/courseDetails`, { state: { courseId } });
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <section>
      {courses && courses.length > 0 ? (
        <div className="flex flex-col items-center w-full min-h-screen bg-cyan-800 shadow-slate-800">
          
          <div className="mb-4">
            <h1 className="text-3xl font-semibold mt-5 underline">
              {domainId ? `Courses` : "All Courses"}
            </h1>
          </div>

          <div className="float-right mt-2 w-96">
          <input
            type="text"
            placeholder="Search For Courses"
            onChange={handleSearchChange}
            value={searchQuery}
            className="w-full max-w-2xl p-2 border border-gray-400 rounded-lg mb-3"
          />
        </div>
          <div className="flex flex-wrap justify-center gap-10 ml-16 mr-16">
            {currentCourses.map((course) => (
              <div
                key={course.id}
                className={`flex flex-col items-center p-2 ${
                  currentCourses.length === 1
                    ? "w-full"
                    : currentCourses.length === 2
                    ? "sm:w-1/2 lg:w-1/2"
                    : "sm:w-1/4 lg:w-1/4"
                }`}
              >
                <img
                  className="w-96 h-60  shadow-2xl border rounded-lg cursor-pointer "
                  src={course.logo}
                  alt={course.name}
                  onClick={() => handleClick(course.id)}
                />
                <Button
                  onClick={() => handleClick(course.id)}
                  variant="text"
                  sx={{ color: "white" }}
                >
                  {course.name}
                </Button>
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
      ) : (
        <div className="flex justify-center mt-36">
          <h1 className="text-2xl font-bold">
            No courses Found for this domian
          </h1>
        </div>
      )}
    </section>
  );
};

export default AllCourses;
