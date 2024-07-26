import { Response } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.ADMIN_JWT_SECRET || "secretkey";

export const generateAdminJwtToken = (res: Response, adminId: string) => {
  const token = jwt.sign({adminId, role:'admin' }, jwtSecret, { expiresIn: "3d" });

  res.cookie("adminAuthToken", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

