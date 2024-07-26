import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "secretkey";

// Extend the Express Request interface
interface CustomRequest extends Request {
  user?: string | JwtPayload; // Adjust this type based on your user type
}

export const redirectAuthenticatedUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.userAuthToken;

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
