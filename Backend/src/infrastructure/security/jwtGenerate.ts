import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "secretkey";

export const generateJwtToken = (res: Response, userId: string) => {
  const token = jwt.sign({ userId,role:"user" }, jwtSecret, { expiresIn: "3d" });

  res.cookie("userAuthToken", token, {   
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
  
};

