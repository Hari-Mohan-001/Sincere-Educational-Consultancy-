import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "secretkey";

interface UserPayload {
  userId: string;
  role: string;
  // Add any other properties that your user object might have
}

// Extend the Express Request interface
 export interface CustomRequest extends Request {
  user?: UserPayload;
}

export const redirectAuthenticatedUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  console.log('redirect');
  const token = req.cookies.userAuthToken || req.headers.authorization?.split(" ")[1];;


  if (token) {
    jwt.verify(
      token,
      jwtSecret,
      (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err) {
          return    
        }
      }
    );
  }
  next();
};
