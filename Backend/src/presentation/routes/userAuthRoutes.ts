import express, { NextFunction } from "express";
import { Request, Response } from "express";
import userAuthController from "../../infrastructure/controllers/userAuthController";
import { mongoUserRepository } from "../../infrastructure/persistance/mongoUserRepository";
import { SignUp } from "../../application/use-cases/User/signUp";
import { checkUserExist } from "../../application/use-cases/User/existingUser";
import signIn from "../../application/use-cases/User/signIn";
import { verifyUserToken } from "../../infrastructure/middleware/verifyUserToken";
import { redirectAuthenticatedUser } from "../../infrastructure/middleware/redirectAuthenticatedUser";
import { isUserBlocked } from "../../infrastructure/middleware/isUserBlocked";

const userAuthRoute = express.Router();
const userRepository = new mongoUserRepository();
const signUpUseCase = new SignUp(userRepository);
const checkUser = new checkUserExist(userRepository);
const signInUseCase = signIn(userRepository);
const UserAuthController = userAuthController(
  signUpUseCase,
  checkUser,
  signInUseCase
);

userAuthRoute.post(
  "/signUp",
  redirectAuthenticatedUser,
  (req: Request, res: Response) => UserAuthController.signUp(req, res)
);
userAuthRoute.post(
  "/verifyOtp",
  redirectAuthenticatedUser,
  (req: Request, res: Response) => UserAuthController.verifyOtp(req, res)
);
userAuthRoute.post(
  "/signIn",
  redirectAuthenticatedUser,
  (req: Request, res: Response) => UserAuthController.signInUser(req, res)
);
userAuthRoute.post(
  "/request-password-reset",
  redirectAuthenticatedUser,
  (req: Request, res: Response) =>
    UserAuthController.passwordResetRequest(req, res)
);
userAuthRoute.post(
  "/reset-password",
  redirectAuthenticatedUser,
  (req: Request, res: Response) => UserAuthController.resetPassword(req, res)
);
userAuthRoute.post(
  "/google-auth",
  redirectAuthenticatedUser,
  (req: Request, res: Response) => UserAuthController.googleAuth(req, res)
);

userAuthRoute.use((req: Request, res: Response, next: NextFunction) => {
  verifyUserToken(req, res, next);
});
userAuthRoute.get("/signOut", (req: Request, res: Response) =>
  UserAuthController.signOutUser(req, res)
);

export default userAuthRoute;
