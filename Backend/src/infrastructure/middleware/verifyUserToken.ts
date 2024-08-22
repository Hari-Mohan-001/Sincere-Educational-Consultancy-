import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const jwtSecret = process.env.JWT_ACCESS_SECRET || "secretkey";

interface UserPayload {
  userId: string;
  role: string;
  // Add any other properties that your user object might have
}

// Extend the Express Request interface
export interface CustomRequest extends Request {
  user?: UserPayload;
}

// Type guard to check if the payload is JwtPayload
const isJwtPayload = (
  payload: string | JwtPayload | undefined
): payload is JwtPayload => {
  return typeof payload === "object" && payload !== null;
};

export const verifyUserToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token =
    req.cookies.userAuthToken || req.headers.authorization?.split(" ")[1];

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

      req.user = { userId: decoded.userId, role: decoded.role };
      if (decoded.role !== "user") {
        res
          .status(403)
          .json({ message: "Access denied: insufficient permissions" });
        return;
      }

      next();
    }
  );
};
