import { IEnrollmentRepository } from "../../../domain/repositories/IEnrollmentRepository";
import { enrollmentDTO } from "../../dtos/enrollmentDto";

export const addNewEnrollment = (
  enrollmentRepository: IEnrollmentRepository
) => {
  const execute = async (enrollmentDto: enrollmentDTO) => {
    const enrollment = await enrollmentRepository.createEnrollment(
      enrollmentDto
    );
    if (!enrollment) {
      throw new Error("Creation of enrollment failed");
    }
    return enrollment;
  };
  return {
    execute,
  };
};
