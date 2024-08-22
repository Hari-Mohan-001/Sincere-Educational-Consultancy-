import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { userApi } from "../../../Api/userApi";

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

const SuggestedCourse = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [suggestedCourses, setSuggestedCourses] = useState<CourseData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getSuggestedCourses = async () => {
      try {
        const qualification = user?.qualification;
        const courses = await userApi.getEligibleCourses(qualification);
        console.log(courses);

        setSuggestedCourses(courses);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.data) {
           
          } else {
            console.log(error.message);
          }
        } else {
          console.log(error);
        }
      }
    };
    getSuggestedCourses();
  }, []);

  const handleClick = (courseId: string) => {
    navigate(`/courseDetails`, { state: { courseId } });
  };
  return (
    <div className="flex flex-col items-center  w-full bg-indigo-400">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Suggested Courses</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-10 ml-16 mr-16">
        {suggestedCourses.map((courses) => (
          <div
            key={courses.id}
            className="flex flex-col items-center  sm:w-1/4 lg:w-1/4 p-2"
          >
            <img
              className="w-96 h-60  shadow-2xl border rounded-lg"
              src={courses.logo}
              alt={courses.name}
            />
            <Button
              onClick={() => handleClick(courses.id)}
              variant="outlined"
              className="!text-white"
            >
              {courses.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedCourse;
