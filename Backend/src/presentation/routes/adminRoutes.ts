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
import counsellorController from "../../infrastructure/controllers/counsellorController";

const adminRouter = express.Router();
const AdminController = adminController();
const CountryController = countryControler();
const UserController = userController();
const UniversityController = universityController();
const EnrollmentController = enrollmentContoller();
const CourseController = courseController();
const OrderController = orderController();
const CounsellorController = counsellorController()

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

adminRouter.get("/users", (req: Request, res: Response) => {
  UserController.getUsers(req, res);
});

adminRouter.get("/approved-universities", (req: Request, res: Response) => {
  UniversityController.getApprovedUniversitiesForAdmin(req, res);
});

adminRouter.get("/not-approved-universities", (req: Request, res: Response) => {
  UniversityController.getNotApprovedUniversities(req, res);
});

adminRouter.get(
  "/not-approved-universities-count",
  (req: Request, res: Response) => {
    UniversityController.getNotApprovedUniversitiesCount(req, res);
  }
);

adminRouter.patch("/user/:userId", (req: Request, res: Response) => {
  UserController.blockOrUnblockUser(req, res);
});

adminRouter.patch(
  "/university/:universityId",
  (req: Request, res: Response) => {
    UniversityController.adminApproveUniversity(req, res);
  }
);

adminRouter.post("/enrollment", (req: Request, res: Response) => {
  EnrollmentController.createEnrollment(req, res);
});

adminRouter.get("/enrollment", (req: Request, res: Response) => {
  EnrollmentController.getEnrollments(req, res);
});

adminRouter.put("/enrollment", (req: Request, res: Response) => {
  EnrollmentController.updateEnrollment(req, res);
});

adminRouter.get("/courses", (req: Request, res: Response) => {
  CourseController.getAllCoursesForAdmin(req, res);
});

adminRouter.get("/orders", (req: Request, res: Response) => {
  OrderController.getAllOrdersForAdmin(req, res);
});

adminRouter.get("/total-revenue/:timeFrame", (req: Request, res: Response) => {
  OrderController.getTotalOrdervalue(req, res);
});

adminRouter.get("/total-orders/:timeFrame", (req: Request, res: Response) => {
  OrderController.getAllTimeframeOrders(req, res);
});

adminRouter.get("/counsellors",(req:Request, res:Response, next:NextFunction)=>{
 CounsellorController.getAllApprovedCounsellors(req,res,next)
});

adminRouter.get("/unApprovedCounsellorsCount",(req:Request, res:Response, next:NextFunction)=>{
  CounsellorController.getUnApprovedCounsellorCount(req,res,next)
})
adminRouter.get("/unApproved-counsellors",(req:Request, res:Response, next:NextFunction)=>{
  CounsellorController.getUnApprovedCounsellors(req,res,next)
})

adminRouter.patch(
  "/counsellor/:counsellorId",
  (req: Request, res: Response,next:NextFunction) => {
    CounsellorController.approveCounsellor(req,res,next);
  }
);

export default adminRouter;
