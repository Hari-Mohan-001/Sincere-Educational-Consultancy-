import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.JWT_ACCESS_SECRET || "secretkey";
const refershTokenSecret = process.env.JWT_REFRESH_SECRET || "refreshsecretkey";

export const generateJwtToken = (res: Response, userId: string) => {
  const accessToken = jwt.sign({ userId, role: "user" }, accessTokenSecret, {
    expiresIn: "30m",
  });

  res.cookie("userAuthToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    // maxAge: 3 * 24 * 60 * 60 * 1000,//3 days
    maxAge: 30 * 60 * 1000, // 15 minutes
  });
  return accessToken;
};

export const generateRefershToken = (userId: string) => {
  const refreshToken = jwt.sign({ userId }, refershTokenSecret, {
    expiresIn: "5d",
  });
 

  return refreshToken;
};
