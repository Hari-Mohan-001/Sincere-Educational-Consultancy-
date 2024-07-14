import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";

export const existingCouncellor = (councellorRepository: IAdminRepository) => {
  const execute = async (email: string): Promise<boolean> => {
    const counsellor = await councellorRepository.doesEmailExist(email);
    console.log('stat',counsellor);
    
    if (counsellor) {
      throw new Error("This email already exist");
    } else {
      return false;
    }
  };

  return {
    execute,
  };
};
