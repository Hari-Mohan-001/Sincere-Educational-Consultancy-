import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const jwtSecret = process.env.COUNSELLOR_JWT_SECRET || "secretkey";

// Extend the Express Request interface
interface CustomRequest extends Request {
  counsellor?: string | JwtPayload; // Adjust this type based on your user type
}

const isJwtPayload = (
  payload: string | JwtPayload | undefined
): payload is JwtPayload => {
  return typeof payload === "object" && payload !== null;
};

export const verifyCounsellorToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.counsellorAuthToken;

  if (!token) {
    res.status(401).json({ message: "login to continue" });
    return;
  }

  jwt.verify(
    token,
    jwtSecret,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err || !decoded || !isJwtPayload(decoded)) {
        res.status(401).json({ message: "login to continue" });
        return;
      }
      req.counsellor = decoded;
      if (decoded.role !== "counsellor") {
        res
          .status(403)
          .json({ message: "Access denied: insufficient permissions" });
        return;
      }

      next();
    }
  );
};
