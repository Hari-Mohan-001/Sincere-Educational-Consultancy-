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
import { universityApproval } from "../../application/use-cases/University/ApproveUniversity";
import { adminGetApprovedUniversities } from "../../application/use-cases/University/adminGetAllUniversities";
import { getUniversity } from "../../application/use-cases/University/getUniversity";
import { getUniversitiesNotApproved } from "../../application/use-cases/University/getNotApproveduniversities";

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
    const countryId = req.params.countryId;
    try {
      const getUniversities = await getAllUniversities(
        universityRepository
      ).execute(countryId);
      if (getUniversities) {

        res.status(200).json({ message: "success", getUniversities });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };
  const getAllApprovedUniversities = async (req: Request, res: Response) => {

    try {
      const getAllUniversities = await AllUniversities(
        universityRepository
      ).execute();
      if (getAllUniversities) {
        res.status(200).json({ message: "success", getAllUniversities });  
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };
  const adminApproveUniversity = async (req: Request, res: Response) => {
    const universityId = req.params.universityId;
    console.log('uni', universityId);
    
    try {
      const approveUniversity = await universityApproval(
        universityRepository
      ).execute(universityId);
      if (approveUniversity) {
        res.status(200).json({ message: "success" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const getApprovedUniversitiesForAdmin = async (req: Request, res: Response)=>{
    try {
            const universities = await adminGetApprovedUniversities(universityRepository).execute()
            console.log('admin',universities);
            
            res.status(200).json({message:'success', data:universities})
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  }

  const getUniversityById = async (req: Request, res: Response)=>{
      try {
         const universityId = req.params.universityId
         console.log(universityId);
         
         const university = await getUniversity(universityRepository).execute(universityId)
         if(university){
          res.status(200).json({message:'Success',data:university})
         }
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        } else {
          res.status(400).json({ message: "An unknown error occurred" });
        }
      }
  }

  const getNotApprovedUniversities = async(req: Request, res: Response)=>{
      try {
        const universities = await getUniversitiesNotApproved(universityRepository).execute()
        if(!universities.length){
          throw new Error("universities not found");  
        }
        console.log('not app', universities);
        
        res.status(200).json({message:'success', data:universities})
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        } else {
          res.status(400).json({ message: "An unknown error occurred" });
        }
      }
  }

  const getNotApprovedUniversitiesCount= async(req: Request, res: Response)=>{
            try {
              const universities = await getUniversitiesNotApproved(universityRepository).execute()

              const count = universities.length
                console.log(count);
                
              res.status(200).json({message:'success', data:count})
            } catch (error) {
              if (error instanceof Error) {
                res.status(400).json({ message: error.message });
              } else {
                res.status(400).json({ message: "An unknown error occurred" });
              }
            }
  }
  return {
    addUniversity,
    getAllUniversity,
    getAllApprovedUniversities,
    adminApproveUniversity,
    getApprovedUniversitiesForAdmin,
    getUniversityById,
    getNotApprovedUniversities ,
    getNotApprovedUniversitiesCount
  };
};
