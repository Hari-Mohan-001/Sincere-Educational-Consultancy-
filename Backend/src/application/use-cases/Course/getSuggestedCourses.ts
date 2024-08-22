import { ICourseRepository } from "../../../domain/repositories/ICourseRepository";

export const SuggestedCourses = (courseRepository: ICourseRepository) => {
  const execute = async (qualification: string) => {
    const courses = await courseRepository.getSuggestedCourse(qualification);

    if (courses.length > 0) {
      return courses;
    } else {
      throw new Error("No courses found for this qualification");
    }
  };
  return {
    execute,
  };
};
