import { IEnrollmentRepository } from "../../../domain/repositories/IEnrollmentRepository";

export const enrollmentUpdate = (
  enrollmentRepository: IEnrollmentRepository
) => {
  const execute = async (enrollId: string, enrollAmount: string) => {
    const update = enrollmentRepository.updateEnrollment(
      enrollId,
      enrollAmount
    );
    if (!update) {
      return false;
    } else {
      return true;
    }
  };
  return {
    execute,
  };
};
