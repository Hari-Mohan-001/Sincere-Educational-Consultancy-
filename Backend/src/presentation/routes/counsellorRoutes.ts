import express from "express";
import { Request, Response ,NextFunction} from "express";
import counsellorController from "../../infrastructure/controllers/counsellorController";
import { universityController } from "../../infrastructure/controllers/universityController";
import courseController from "../../infrastructure/controllers/courseController";
import { verifyCounsellorToken } from "../../infrastructure/middleware/verifyCounsellorToken";
import domainController from "../../infrastructure/controllers/domainController";

const counsellorRouter = express.Router();
const CounsellorController = counsellorController();
const UniversityController = universityController()
const CourseController = courseController()
const DomainController = domainController()

counsellorRouter.post("/signup", (req: Request, res: Response) =>
  CounsellorController.signUp(req, res)
);
counsellorRouter.post("/signin", (req: Request, res: Response) =>
  CounsellorController.signIn(req, res)
);

//counsellorRouter.use((req: Request, res: Response,next:NextFunction)=> verifyCounsellorToken(req,res,next))

counsellorRouter.post("/university",(req:Request,res:Response)=>{
  UniversityController.addUniversity(req,res)
})
counsellorRouter.post("/course",(req:Request,res:Response)=>{
  CourseController.addCourse(req,res)
})
counsellorRouter.get("/signout", (req: Request, res: Response,next:NextFunction) =>
  CounsellorController.signout(req, res,next )   
);

counsellorRouter.post("/domain",(req:Request,res:Response)=>{
DomainController.addDomain(req,res)
})



export default counsellorRouter;
