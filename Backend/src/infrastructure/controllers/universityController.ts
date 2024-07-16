import { Request, Response } from "express";
import {
  cloudinaryUpload,
  cloudinaryUploadMultiple,
} from "../services/CloudinaryUpload";
import { addNewUniversity } from "../../application/use-cases/University/AddUniversity";
import { mongoUniversityRepository } from "../persistance/mongoUniversityRepository";
import { universityDTO } from "../../application/dtos/universityDto";
import { getAllUniversities } from "../../application/use-cases/Counsellor/getAllUniversity";
import { AllUniversities } from "../../application/use-cases/Counsellor/getUniversities";

const universityRepository = new mongoUniversityRepository();

export const universityController = () => {
  const addUniversity = async (req: Request, res: Response) => {
    const { name, address, ranking, country, logo, images } = req.body;
    try {
      const logoUrl = await cloudinaryUpload(logo, "University");
      const imagesUrl = await cloudinaryUploadMultiple(images, "University");
      const universityDto = new universityDTO(
        name,
        address,
        ranking,
        logoUrl,
        imagesUrl,
        country
      );
      const createUniversity = await addNewUniversity(
        universityRepository
      ).execute(universityDto);
      console.log("new", createUniversity);

      if (createUniversity) {
        res.status(200).json({ message: "university created successfully" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const getAllUniversity = async (req: Request, res: Response) => {
    console.log('getalluni');
    
    const countryId = req.params.countryId;
    try {
      const getUniversities = await getAllUniversities(
        universityRepository
      ).execute(countryId);
      if(getUniversities){
        console.log('uni', getUniversities);
        
        res.status(200).json({message:"success", getUniversities})
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };
  const getallUniversities= async (req: Request, res: Response) => {
    console.log('getalluni');
    
    try {
      const getAllUniversities = await AllUniversities(
        universityRepository
      ).execute();
      if(getAllUniversities){
        
        res.status(200).json({message:"success", getAllUniversities})
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };
  return {
    addUniversity,
    getAllUniversity,
    getallUniversities
  };
};
