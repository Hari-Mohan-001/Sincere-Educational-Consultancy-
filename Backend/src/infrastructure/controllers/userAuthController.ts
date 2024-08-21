import { NextFunction, Request, Response } from "express";
import { SignUp } from "../../application/use-cases/User/signUp";
import { userDTO } from "../../application/dtos/userDto";
import { v4 as uuidv4 } from "uuid";
import {
  storeUserDetails,
  verifyOtpAndGetUser,
} from "../../application/use-cases/User/verifyOtp";
import { sendOtp } from "../services/twilioServices";
import { checkUserExist } from "../../application/use-cases/User/existingUser";
import { generateOtp } from "../utils/otpGenerator";
import {
  generateJwtToken,
  generateRefershToken,
} from "../security/jwtGenerate";
import { signInUseCase } from "../../application/interfaces/signIn";
import { signOut } from "../../application/use-cases/User/SignOut";

import { findUserByEmail } from "../../application/use-cases/User/findUser";
import { mongoUserRepository } from "../persistance/mongoUserRepository";
import { sendMail } from "../services/nodeMailer";
import {
  clearResetInfo,
  resetPasswordUseCase,
  storeResetInfo,
  verifyResetInfo,
} from "../../application/use-cases/User/resetPassword";
import googleAuthCase from "../../application/use-cases/User/googleAuthCase";
import { updateRefreshToken } from "../../application/use-cases/User/updateRefershToken";
import { verifyRefreshToken } from "../middleware/verifyRefreshToken";
import { getAUser } from "../../application/use-cases/User/getAUser";
import { CustomRequest } from "../middleware/verifyUserToken";

const userRepository = new mongoUserRepository();

let otpToken: string = "";

const userAuthController = (
  signUpUseCase: SignUp,
  checkUser: checkUserExist,
  signInUseCase: signInUseCase
) => {
  const signUp = async (req: Request, res: Response): Promise<void> => {
    const { name, email, mobile, password, qualification } = req.body;
    const userDto = new userDTO(name, email, mobile, password, qualification);
    try {
      await checkUser.execute(userDto);
      const otp = generateOtp();
      const token = uuidv4();
      otpToken = token;
      storeUserDetails(userDto, otp, token);

      const executeSendOtp = await sendOtp(mobile, otp);

      res.status(201).json({ message: "otp send successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { otp } = req.body;
      const userDto = verifyOtpAndGetUser(otpToken, otp);
      if (userDto) {
        const userDoc = await signUpUseCase.execute(userDto);
        const { password: hashedPassword, ...user } = userDoc;
        res
          .status(201)
          .json({ message: "user created successfully", data: user });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };

  const signInUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await signInUseCase.execute(email, password);
      const accessToken = generateJwtToken(res, user.id);
      const refreshToken = generateRefershToken(user.id);
      const updateUser = await updateRefreshToken(userRepository).execute(
        refreshToken,
        user.id
      );
      console.log(refreshToken, updateUser);

      if (!updateUser) {
        return res.status(400).json({ message: "Refersh Token not updated" });
      }
      const {
        password: hashedPassword,
        refreshToken: token,
        ...userData
      } = user;
      console.log(userData);

      res.status(201).json({
        message: "user Signed succesfully",
        user: userData,
        refreshToken: refreshToken,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };

  const refreshTokenEndPoint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log("ceretenew refreshtok");

      const { refreshToken } = req.body;
      console.log(refreshToken);

      // Verify the refresh token
      const decoded = verifyRefreshToken(refreshToken);
      console.log("decoded", decoded, decoded.userId);

      // Find the user in the database
      const user = await getAUser(userRepository).execute(decoded.userId);
      if (!user || user.refreshToken != refreshToken) {
        console.log("helo failed");
        return res.status(403).json({ message: "Invalid refresh token" });
      }
      // Generate a new access token
      const newAccessToken = generateJwtToken(res, user.id);

      // Generate a new refresh token
      const newRefreshToken = generateRefershToken(user.id);
      console.log(refreshToken === newRefreshToken);

      // Update the refresh token in the database
      const updateUser = await updateRefreshToken(userRepository).execute(
        newRefreshToken,
        user.id
      );
      console.log("trueuser", updateUser);

      res.json({ refreshToken: newRefreshToken });
    } catch (error) {
      next(error);
    }
  };

  const googleAuth = async (req: Request, res: Response) => {
    const { name, email, mobile, image } = req.body;
    const password = "";
    const userDto = new userDTO(name, email, mobile, password);
    try {
      const userInit = googleAuthCase(userRepository);
      const user_doc = await userInit.execute(userDto);
      const { password: hashedPassword, ...user } = user_doc;
      generateJwtToken(res, user_doc.id);
      return res.status(201).json({ message: "Success", user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };

  const passwordResetRequest = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { email } = req.body;
    try {
      const findUser = findUserByEmail(userRepository);
      const user = await findUser.execute(email);
      if (!user) {
        res.status(401).json({ message: "user does not exist" });
      }
      const resetToken = uuidv4();
      const tokenExpiry = Date.now() + 3600000;
      const uniqueIdentifier = uuidv4();
      storeResetInfo(uniqueIdentifier, {
        userId: user.id,
        token: resetToken,
        tokenExpiry,
      });
      // storeResetToken(user.id, resetToken, tokenExpiry);
      const resetLink = `Hello ${user.name} Please click <a href="http://localhost:5173/reset-password?id=${uniqueIdentifier}">here</a> to reset your password`;
      await sendMail(email, "Password Reset", `${resetLink}`);
      res.status(200).json({ message: "Password reset link send to mail" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };

  const resetPassword = async (req: Request, res: Response) => {
    const { password } = req.body;
    const { uniqueId } = req.query;
    try {
      if (typeof uniqueId !== "string") {
        return res.status(400).json({ message: "Inavalid token or userId" });
      }
      // const user = await getResetToken(id, token);
      const resetInfo = verifyResetInfo(uniqueId);
      const findUser = await resetPasswordUseCase(userRepository).findUser(
        resetInfo.userId
      );
      const updatePassword = await resetPasswordUseCase(
        userRepository
      ).updatePassword(resetInfo.userId, password);
      if (updatePassword) {
        // Clear the reset info
        clearResetInfo(uniqueId);
        res.status(200).json({ message: "password updated" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };

  const signOutUser = async (req: CustomRequest, res: Response) => {
    const userId = req.user?.userId;
    try {
      if (userId) {
        const user = await getAUser(userRepository).execute(userId);
        const signOutUser = await signOut(userRepository).execute(userId, res);
        if (signOutUser) {
          return res.status(200).json({ message: " signout success" });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };
  return {
    signUp,
    verifyOtp,
    signInUser,
    googleAuth,
    signOutUser,
    passwordResetRequest,
    resetPassword,
    refreshTokenEndPoint,
  };
};

export default userAuthController;
