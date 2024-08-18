import { Request, Response } from "express"
import { cloudinaryUpload } from "../services/CloudinaryUpload"
import { enrollmentDTO } from "../../application/dtos/enrollmentDto"
import { mongoEnrollmentRepository } from "../persistance/mongoEnrollmentRepository"
import { addNewEnrollment } from "../../application/use-cases/Enrollment/AddNewEnrollment"
import { getAllEnrollments } from "../../application/use-cases/Enrollment/getAllEnrollments"
import { enrollmentUpdate } from "../../application/use-cases/Enrollment/updateEnrollment"

const enrollmentRepository = new mongoEnrollmentRepository()

const enrollmentContoller = ()=>{
    const createEnrollment = async(req:Request,res:Response)=>{
            try {
               const {name, amount,image} = req.body
               const imageUrl = await cloudinaryUpload(image, "Enrollment")
               const enrollmentDto = new enrollmentDTO(name,amount,imageUrl)
               const newEnrollment = await addNewEnrollment(enrollmentRepository).execute(enrollmentDto)
               console.log('newenrol', newEnrollment);
               
               if(newEnrollment){
                res.status(200).json({message:"success"})
               }
            } catch (error) {
                if (error instanceof Error) { 
                    res.status(400).json({ message: error.message });
                  } else {
                    res.status(400).json({ message: "An unknown error occurred" });
                  } 
            } 
    }

    const getEnrollments = async(req:Request,res:Response)=>{
        try {
            const enrollments = await getAllEnrollments(enrollmentRepository).execute()
            if(!enrollments.length){
                throw new Error("No enrollments found");   
            }
            res.status(200).json({message:'success', data:enrollments})
        } catch (error) {
            if (error instanceof Error) { 
                res.status(400).json({ message: error.message });
              } else {
                res.status(400).json({ message: "An unknown error occurred" });
              }
        }
    }
    const updateEnrollment = async(req:Request,res:Response)=>{
        try {
            console.log(req.body.enrollData);
            const{enrollId, enrollAmount} = req.body.enrollData
            const update = await enrollmentUpdate(enrollmentRepository).execute(enrollId, enrollAmount)
            if(update){
                res.status(200).json({message:'success'})
            }   
        } catch (error) {
            if (error instanceof Error) { 
                res.status(400).json({ message: error.message });
              } else {
                res.status(400).json({ message: "An unknown error occurred" });
              } 
        }
    }
    return{
        createEnrollment,
        getEnrollments,
        updateEnrollment
    }
}

export default enrollmentContoller