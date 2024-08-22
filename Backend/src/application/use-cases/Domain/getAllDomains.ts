import { IDomainRepository } from "../../../domain/repositories/IDomainRepository";

export const getAllDomains = (domainRepository: IDomainRepository) => {
  const execute = async () => {
    try {
      const domains = await domainRepository.getAllDomain();
      if (domains) {
        return domains;
      }
    } catch (error) {
      throw error;
    }
  };
  return { execute };
};
