import express from "express";
import { Request, Response, NextFunction } from "express";
import counsellorController from "../../infrastructure/controllers/counsellorController";
import { universityController } from "../../infrastructure/controllers/universityController";
import courseController from "../../infrastructure/controllers/courseController";
import { verifyCounsellorToken } from "../../infrastructure/middleware/verifyCounsellorToken";
import domainController from "../../infrastructure/controllers/domainController";
import orderController from "../../infrastructure/controllers/orderController";
import eventController from "../../infrastructure/controllers/eventController";
import { messageController } from "../../infrastructure/controllers/messageController";
import { userController } from "../../infrastructure/controllers/userController";

const counsellorRouter = express.Router();
const CounsellorController = counsellorController();
const UniversityController = universityController();
const CourseController = courseController();
const DomainController = domainController();
const OrderController = orderController();
const EventController = eventController();
const MessageController = messageController()
const UserController = userController()

counsellorRouter.post("/signup", (req: Request, res: Response) =>
  CounsellorController.signUp(req, res)
);
counsellorRouter.post("/signin", (req: Request, res: Response) =>
  CounsellorController.signIn(req, res)
);

//middleware verify counsellor
counsellorRouter.use((req: Request, res: Response, next: NextFunction) =>
  verifyCounsellorToken(req, res, next)
);

counsellorRouter.post("/university", (req: Request, res: Response) => {
  UniversityController.addUniversity(req, res);
});
counsellorRouter.post("/course", (req: Request, res: Response) => {
  CourseController.addCourse(req, res);
});

counsellorRouter.get(
  "/signout",
  (req: Request, res: Response) =>
    CounsellorController.signout(req, res)
);

counsellorRouter.post("/domain", (req: Request, res: Response) => {
  DomainController.addDomain(req, res);
});

counsellorRouter.get("/courses/:countryId", (req: Request, res: Response) => {
  CourseController.counsellorCourse(req, res);
});

counsellorRouter.get(
  "/orders/:countryId",
  (req: Request, res: Response) => {
    OrderController.getEnrolledOrders(req, res);
  }
);

counsellorRouter.post("/event", (req: Request, res: Response) => {
  EventController.createEvent(req, res);
});

counsellorRouter.get("/messages",(req: Request, res: Response)=>{
MessageController.getMessagesForCounsellor(req,res)
})

counsellorRouter.post("/send-meet-link",(req: Request, res: Response)=>{
UserController.sendlink(req,res)
})
export default counsellorRouter;
