import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CourseData } from "../../../Interface/Course/CourseData";
import { UniversityData } from "../../../Interface/University/UniversityData";
import { Button } from "@mui/material";
import { api } from "../../../Api/api";

const CourseDetails = () => {
  const location = useLocation();
  const { courseId } = location.state;
  const [course, setCourse] = useState<CourseData>();
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchCourse = async () => {
        const course = await api.getCourseDetails(courseId);
        console.log(course);
        
        if (course) {
          setCourse(course);
        }
      };

      const fetchUniversities = async () => {
        const universities = await api.getUniversitiesForACourse(courseId);
        if (universities) {
          setUniversities(universities);
        }
      };
      fetchCourse();
      fetchUniversities();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClick = (universityId: string) => {
    navigate(`/universityDetails`, { state: { universityId } });
  };
  return (
    <section className="bg-slate-100">
      <div className="flex justify-center">
        <div className="w-2/3 h-auto bg-indigo-200 mt-5 rounded-md">
          <div className="flex p-5 max-h-72">
            <div>
              <img
                className="rounded-lg shadow-md h-60"
                src={course?.logo}
                alt=""
              />
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
        <h1 className="text-2xl underline">
          Universities which offer this course
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        {universities.map((university) => {
          return (
            <div
              key={university._id}
              className=" w-2/5 h-auto border mt-5 rounded-md shadow-2xl"
            >
              <div className="flex p-5 w-full">
                <div className="">
                  <img
                    className="rounded-lg shadow-md"
                    src={university.logo}
                    alt=""
                  />
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
                <Button
                  onClick={() => handleClick(university._id)}
                  variant="outlined"
                  color="inherit"
                >
                  Show More
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CourseDetails;
