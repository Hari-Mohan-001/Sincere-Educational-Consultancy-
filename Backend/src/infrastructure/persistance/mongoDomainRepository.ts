import { Domain } from "../../domain/entities/domain";
import { IDomainRepository } from "../../domain/repositories/IDomainRepository";
import domainModel from "../../presentation/models/domainModel";

export class mongoDomainRepository implements IDomainRepository {
  public async createDomain(domain: Domain): Promise<Domain> {
    try {
      const addDomain = new domainModel({
        name: domain.name,
        image: domain.image,
      });
      const newDomain = await addDomain.save();

      return new Domain(
        newDomain._id.toString(),
        newDomain.name,
        newDomain.image
      );
    } catch (error) {
      throw new Error("Error creating the domain");
    }
  }

  public async getAllDomain(): Promise<Domain[]> {
    try {
      const domains = await domainModel.find();
      return domains.map(
        (domain) => new Domain(domain._id.toString(), domain.name, domain.image)
      );
    } catch (error) {
      throw error;
    }
  }
}
