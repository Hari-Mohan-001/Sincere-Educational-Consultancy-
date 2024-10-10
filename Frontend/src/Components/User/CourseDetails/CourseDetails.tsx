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
        <div className="w-full md:w-2/3 h-auto bg-indigo-200 mt-5 rounded-md">
          {/* Flex column on small screens and row on larger */}
          <div className="flex flex-col md:flex-row p-5 max-h-72">
            <div className="flex justify-center">
              <img
                className="rounded-lg shadow-md h-40 md:h-60 w-full md:w-auto"
                src={course?.logo}
                alt=""
              />
            </div>
            <div className="flex items-center mt-4 md:mt-0 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">{course?.name}</h1>
            </div>
          </div>

          <div className="flex flex-col p-3">
            <div className="max-w-2xl mx-auto md:mx-0">
              <p className="font-medium text-center md:text-left">{course?.description}</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <p className="mt-2">Duration: {course?.duration}</p>
              <p className="mt-2">Fees: {course?.fees}</p>
              <p className="mt-2">Qualification: {course?.qualification}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Universities Section */}
      <div className="flex justify-center mt-6">
        <h1 className="text-2xl underline">Universities Offering This Course</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        {universities.map((university) => {
          return (
            <div
              key={university._id}
              className="w-full md:w-2/5 h-auto border mt-5 rounded-md shadow-2xl"
            >
              <div className="flex flex-col md:flex-row p-5">
                <div className="flex justify-center md:justify-start">
                  <img
                    className="rounded-lg shadow-md h-32 w-32"
                    src={university.logo}
                    alt=""
                  />
                </div>
                <div className="flex items-center mt-4 md:mt-0 md:ml-10">
                  <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">{university.name}</h1>
                </div>
              </div>

              <div className="flex flex-col p-3 items-center md:items-start">
                <div className="max-w-2xl">
                  <p>Address: {university.address}</p>
                </div>
                <div>
                  <p>Ranking: {university.ranking}</p>
                </div>
              </div>
              <div className="p-3 flex justify-center md:justify-end">
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
