import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.COUNSELLOR_JWT_SECRET || "secretkey";

export const generateCounsellorJwtToken = (res: Response, userId: string) => {
  const token = jwt.sign({ userId, role: "counsellor" }, jwtSecret, {
    expiresIn: "3d",
  });

  res.cookie("counsellorAuthToken", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};
