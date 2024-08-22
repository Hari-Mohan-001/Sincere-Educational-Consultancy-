import { ICourseRepository } from "../../../domain/repositories/ICourseRepository";

export const getCounsellorCourses = (courseRepository: ICourseRepository) => {
  const execute = async (countryId: string) => {
    const courses = await courseRepository.getCounsellorCourse(countryId);

    if (courses.length > 0) {
      return courses;
    } else {
      throw new Error("No courses found");
    }
  };
  return {
    execute,
  };
};
