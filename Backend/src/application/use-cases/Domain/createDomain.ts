import { Domain } from "../../../domain/entities/domain";
import { IDomainRepository } from "../../../domain/repositories/IDomainRepository";
import { domainDTO } from "../../dtos/domainDto";

export const createDomain = (domainRepository: IDomainRepository) => {
  const execute = async (domainDto: domainDTO): Promise<Domain> => {
    const domainData = new Domain("", domainDto.name, domainDto.image);

    const newDomain = await domainRepository.createDomain(domainData);

    return newDomain;
  };

  return {
    execute,
  };
};
