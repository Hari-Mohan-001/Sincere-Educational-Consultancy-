import express, { NextFunction } from "express";
import { Request, Response } from "express";
import adminController from "../../infrastructure/controllers/adminController";
import countryControler from "../../infrastructure/controllers/countryController";
import { userController } from "../../infrastructure/controllers/userController";
import { universityController } from "../../infrastructure/controllers/universityController";
import enrollmentContoller from "../../infrastructure/controllers/enrollmentController";
import { verifyAdminToken } from "../../infrastructure/middleware/verifyAdminToken";

const adminRouter = express.Router();
const AdminController = adminController();
const CountryController = countryControler();
const UserController = userController() 
const UniversityController = universityController()
const EnrollmentController = enrollmentContoller()

adminRouter.post("/signin", (req: Request, res: Response) =>
  AdminController.adminLogin(req, res)
);

adminRouter.get("/signout", (req: Request, res: Response) =>
  AdminController.adminLogout(req, res)
);

//jwt verify
adminRouter.use((req: Request, res: Response, next: NextFunction) => {  
  verifyAdminToken(req, res, next);
});

adminRouter.post("/country", (req: Request, res: Response) =>
  CountryController.addCountry(req, res)
);

adminRouter.get("/users",(req:Request,res:Response)=>{
  UserController.getUsers(req,res)
})

adminRouter.get("/universities",(req:Request,res:Response)=>{ 
  UniversityController.getAllUniversitiesForAdmin(req,res)
})

adminRouter.patch("/user/:userId",(req:Request,res:Response)=>{
UserController.blockOrUnblockUser(req,res)
})

adminRouter.patch("/university/:universityId",(req: Request, res: Response)=>{
UniversityController.adminApproveUniversity(req,res)
})

adminRouter.post("/enrollment",(req: Request, res: Response)=>{
EnrollmentController.createEnrollment(req,res)
})

adminRouter.get("/enrollment",(req: Request, res: Response)=>{
  EnrollmentController.getEnrollments(req,res)
})

export default adminRouter;
