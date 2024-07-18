import { Domain } from "../entities/domain";

export interface IDomainRepository{
    createDomain(domain:Domain):Promise<Domain>
    getAllDomain():Promise<Domain[]>
}