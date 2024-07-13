import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const jwtSecret = process.env.ADMIN_JWT_SECRETT || "secretkey";

export const generateAdminJwtToken = (res: Response, email: string) => {
  const token = jwt.sign({ email }, jwtSecret, { expiresIn: "3d" });

  res.cookie("adminAuthToken", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

