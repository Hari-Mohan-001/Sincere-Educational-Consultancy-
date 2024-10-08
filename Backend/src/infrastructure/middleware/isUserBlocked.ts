import { NextFunction, Request, Response } from "express";
import { decode, JwtPayload } from "jsonwebtoken";
import userModel from "../../presentation/models/UserModel";

export const isUserBlocked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.userAuthToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorised" });
    }
    const decoded = decode(token) as JwtPayload | null;
    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userId = decoded.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user?.isBlocked) {
      return res.status(403).json({message:'user blocked',redirectTo:`${process.env.FRONTEND_BASE_URL}/signIn`});
      // return res.status(403).json({ message: "You are blocked" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
