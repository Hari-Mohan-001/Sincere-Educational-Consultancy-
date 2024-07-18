import express from "express";
import { Request, Response } from "express";
import adminController from "../../infrastructure/controllers/adminController";
import countryControler from "../../infrastructure/controllers/countryController";
import { userController } from "../../infrastructure/controllers/userController";

const adminRouter = express.Router();
const AdminController = adminController();
const CountryController = countryControler();
const UserController = userController() 

adminRouter.post("/signin", (req: Request, res: Response) =>
  AdminController.adminLogin(req, res)
);

adminRouter.get("/signout", (req: Request, res: Response) =>
  AdminController.adminLogout(req, res)
);

adminRouter.post("/country", (req: Request, res: Response) =>
  CountryController.addCountry(req, res)
);

adminRouter.get("/users",(req:Request,res:Response)=>{
  UserController.getUsers(req,res)
})

adminRouter.patch("/user/:userId",(req:Request,res:Response)=>{
UserController.blockOrUnblockUser(req,res)
})

export default adminRouter;
