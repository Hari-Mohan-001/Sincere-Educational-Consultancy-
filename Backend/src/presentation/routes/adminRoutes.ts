import express, { NextFunction } from "express";
import { Request, Response } from "express";
import adminController from "../../infrastructure/controllers/adminController";
import countryControler from "../../infrastructure/controllers/countryController";
import { userController } from "../../infrastructure/controllers/userController";
import { universityController } from "../../infrastructure/controllers/universityController";
import enrollmentContoller from "../../infrastructure/controllers/enrollmentController";
import { verifyAdminToken } from "../../infrastructure/middleware/verifyAdminToken";
import courseController from "../../infrastructure/controllers/courseController";
import orderController from "../../infrastructure/controllers/orderController";

const adminRouter = express.Router();
const AdminController = adminController();
const CountryController = countryControler();
const UserController = userController() 
const UniversityController = universityController()
const EnrollmentController = enrollmentContoller()
const CourseController = courseController()
const OrderController = orderController()

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

adminRouter.get("/approved-universities",(req:Request,res:Response)=>{ 
  UniversityController.getApprovedUniversitiesForAdmin(req,res)
})

adminRouter.get("/not-approved-universities",(req:Request,res:Response)=>{
  UniversityController.getNotApprovedUniversities(req, res)
})

adminRouter.get("/not-approved-universities-count",(req:Request,res:Response)=>{
  UniversityController.getNotApprovedUniversitiesCount(req, res)
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

adminRouter.get("/courses",(req: Request, res: Response)=>{
CourseController.getAllCoursesForAdmin(req,res)
})

adminRouter.get("/total-revenue/:timeFrame",(req: Request, res: Response)=>{  
OrderController.getTotalOrdervalue(req,res)
})

adminRouter.get("/total-orders/:timeFrame",(req: Request, res: Response)=>{
  OrderController.getAllTimeframeOrders(req,res)
})

export default adminRouter;
