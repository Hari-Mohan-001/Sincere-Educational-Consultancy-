import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const jwtSecret = process.env.COUNSELLOR_JWT_SECRET || "secretkey";

// Extend the Express Request interface
interface CustomRequest extends Request {
    counsellor?: string|JwtPayload; // Adjust this type based on your user type
  }

export const verifyCounsellorToken = ( req: CustomRequest,res: Response,next: NextFunction): void => {
    console.log('verify');
    const token = req.cookies.counsellorAuthToken;  
    console.log(token);
    
    if (!token) {
      console.log('notok');
      
      res.status(401).json({ message: "login to continue" });
      return
    }
  
    jwt.verify(token,jwtSecret,(err: VerifyErrors | null, decoded: JwtPayload | string| undefined) => {
        if (err) {
          console.log(err);
          
          res.status(401).json({ message: "login to continue" });
          return;
        }
        req.counsellor = decoded;
        console.log('verfied',req.counsellor);
        
        next();
      }
    );
  };