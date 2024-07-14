import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const jwtSecret = process.env.ADMIN_JWT_SECRET || "secretkey";

// Extend the Express Request interface
interface CustomRequest extends Request {
    admin?: string|JwtPayload; // Adjust this type based on your user type
  }

export const verifyAdminToken = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const token = req.cookies.adminAuthToken;
    if (!token) {
      res.status(401).json({ message: "login to continue" });
      return
    }
  
    jwt.verify(
      token,
      jwtSecret,
      (err: VerifyErrors | null, decoded: JwtPayload | string| undefined) => {
        if (err) {
          res.status(401).json({ message: "login to continue" });
          return;
        }
        req.admin = decoded;
        next();
      }
    );
  };