import express, { Request, Response }  from "express";
import countryControler from "../../infrastructure/controllers/countryController";
import { universityController } from "../../infrastructure/controllers/universityController";
import courseController from "../../infrastructure/controllers/courseController";
import domainController from "../../infrastructure/controllers/domainController";
import courseUniversityController from "../../infrastructure/controllers/courseUniversityController";
import orderController from "../../infrastructure/controllers/orderController";
import { messageController } from "../../infrastructure/controllers/messageController";
const CountryControler = countryControler() 
const UniversityController = universityController()
const CourseController = courseController()
const DomainContoller = domainController()
const CourseUniversityController = courseUniversityController()
const OrderController = orderController()
const MessageController = messageController()
const router = express.Router()

router.get("/countries",(req:Request,res:Response)=>{
CountryControler.getAllCountries(req,res)
})
router.get("/universities/:countryId", (req:Request,res:Response)=>{
  UniversityController.getAllUniversity(req,res)  
})
router.get("/universities", (req:Request,res:Response)=>{
  UniversityController.getAllApprovedUniversities(req,res)  
})
router.get("/courses", (req:Request,res:Response)=>{
  CourseController.getAllCourse(req,res)  
})
router.get("/domains",(req:Request,res:Response)=>{
DomainContoller.getDomains(req,res)
})
router.get("/course/:courseId",(req:Request,res:Response)=>{ 
  CourseController.getACourse(req,res)
})
router.get("/universities-course/:courseId",(req:Request,res:Response)=>{ 
CourseUniversityController.getAllUniversity(req,res)
})
router.get("/university/:universityId",(req:Request,res:Response)=>{
UniversityController.getUniversityById(req,res)
})

router.post("/upload-chat-image",(req:Request,res:Response)=>{
  console.log('cht rote');
  
MessageController.chatImageUpload(req,res)
})
router.get("/courses/:domainId",(req:Request,res:Response)=>{
  CourseController.domainSpecificCourses(req,res)
})

// Stripe requires the raw body to validate the signature


// router.post("/webhook", express.raw({ type: "application/json" }),(req:Request,res:Response)=>{
//   console.log("Webhook received:");
// OrderController.CheckPaymentAndCreateOrder(req,res)
// })
export default router 