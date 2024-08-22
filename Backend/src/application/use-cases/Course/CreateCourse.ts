import { ICourseRepository } from "../../../domain/repositories/ICourseRepository";
import { CourseDTO } from "../../dtos/courseDto";

export const createNewCourse = (courseRepository: ICourseRepository) => {
  const execute = async (courseDto: CourseDTO) => {
    const course = await courseRepository.createCourse(courseDto);

    if (course) {
      return course;
    } else {
      throw new Error("Falied to create Course");
    }
  };
  return {
    execute,
  };
};
