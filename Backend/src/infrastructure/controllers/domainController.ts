import { Request, Response } from "express";
import { mongoDomainRepository } from "../persistance/mongoDomainRepository";
import { domainDTO } from "../../application/dtos/domainDto";
import { createDomain } from "../../application/use-cases/Domain/createDomain";
import { cloudinaryUpload } from "../services/CloudinaryUpload";
import { getAllDomains } from "../../application/use-cases/Domain/getAllDomains";

const domainRepository = new mongoDomainRepository();

const domainController = () => {
  const addDomain = async (req: Request, res: Response) => {
    const { name, image } = req.body;

    try {
      const imageUrl = await cloudinaryUpload(image, "Domain");

      const domainDto = new domainDTO(name, imageUrl);
      const addNewDomain = await createDomain(domainRepository).execute(
        domainDto
      );
      if (addNewDomain) {
        res.status(200).json({ message: "domain added successfully" });
      }
    } catch (error) {
      res.status(400).json({ message: "failed to add domain" });
    }
  };

  const getDomains = async (req: Request, res: Response) => {
    try {
      const domains = await getAllDomains(domainRepository).execute();
      if (domains) {
        return res.status(200).json({ message: "success", data: domains });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch domains" });
    }
  };

  return {
    addDomain,
    getDomains,
  };
};

export default domainController;
