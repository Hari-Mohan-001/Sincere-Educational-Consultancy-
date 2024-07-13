import express from "express";
import { Request, Response } from "express";
import counsellorController from "../../infrastructure/controllers/counsellorController";

const counsellorRouter = express.Router();
const CounsellorController = counsellorController();

counsellorRouter.post("/signup", (req: Request, res: Response) =>
  CounsellorController.signUp(req, res)
);
counsellorRouter.post("/signin", (req: Request, res: Response) =>
  CounsellorController.signIn(req, res)
);
counsellorRouter.post("/signout", (req: Request, res: Response) =>
  CounsellorController.signIn(req, res)
);

export default counsellorRouter;
