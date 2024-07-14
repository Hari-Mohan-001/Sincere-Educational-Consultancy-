import express, { Request, Response }  from "express";
import countryControler from "../../infrastructure/controllers/countryController";
import { universityController } from "../../infrastructure/controllers/universityController";
const CountryControler = countryControler() 
const UniversityController = universityController()
const router = express.Router()

router.get("/countries",(req:Request,res:Response)=>{
CountryControler.getAllCountries(req,res)
})
router.get("/universities/:countryId", (req:Request,res:Response)=>{
  UniversityController.getAllUniversity(req,res)  
})

export default router