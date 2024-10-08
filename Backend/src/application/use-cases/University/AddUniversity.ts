import { University } from "../../../domain/entities/university";
import { IUniversityRepository } from "../../../domain/repositories/IUniversityRepository";
import { universityDTO } from "../../dtos/universityDto";

export const addNewUniversity = (
  universityRepository: IUniversityRepository
) => {
  const execute = async (universityDto: universityDTO) => {
    const data = await universityRepository.createUniversity(universityDto);
    if (!data) {
      return false;
    }
    return true;
  };

  return {
    execute,
  };
};
