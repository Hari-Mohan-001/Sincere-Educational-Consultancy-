import { ICourseRepository } from "../../../domain/repositories/ICourseRepository";

export const allCourses = (courseRepository: ICourseRepository) => {
  const execute = async () => {
    const data = await courseRepository.getAllCourse();
    if (data.length >= 1) {
      return data;
    } else {
      throw new Error("No university listed");
    }
  };
  return {
    execute,
  };
};
