import express, { Request, Response }  from "express";
import countryControler from "../../infrastructure/controllers/countryController";
import { universityController } from "../../infrastructure/controllers/universityController";
import courseController from "../../infrastructure/controllers/courseController";
import domainController from "../../infrastructure/controllers/domainController";
const CountryControler = countryControler() 
const UniversityController = universityController()
const CourseController = courseController()
const DomainContoller = domainController()
const router = express.Router()

router.get("/countries",(req:Request,res:Response)=>{
CountryControler.getAllCountries(req,res)
})
router.get("/universities/:countryId", (req:Request,res:Response)=>{
  UniversityController.getAllUniversity(req,res)  
})
router.get("/universities", (req:Request,res:Response)=>{
  UniversityController.getallUniversities(req,res)  
})
router.get("/courses", (req:Request,res:Response)=>{
  CourseController.getAllCourse(req,res)  
})
router.get("/domains",(req:Request,res:Response)=>{
DomainContoller.getDomains(req,res)
})

export default router