import { Request, Response } from "express";
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
import { generateJwtToken } from "../security/jwtGenerate";
import { signInUseCase } from "../../application/interfaces/signIn";
import { signOut } from "../../application/use-cases/User/SignOut";

import { findUserByEmail } from "../../application/use-cases/User/findUser";
import { mongoUserRepository } from "../persistance/mongoUserRepository";
import { sendMail } from "../services/nodeMailer";
import {
  getResetToken,
  resetPasswordUseCase,
  storeResetToken,
} from "../../application/use-cases/User/resetPassword";
import googleAuthCase from "../../application/use-cases/User/googleAuthCase";

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
        generateJwtToken(res, userDoc.id);

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

      generateJwtToken(res, user.id);

      const { password: hashedPassword, ...userData } = user;
      console.log(userData);

      res
        .status(201)
        .json({ message: "user Signed succesfully", user: userData });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
        console.log("signback", error.message);
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
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
      storeResetToken(user.id, resetToken, tokenExpiry);
      const resetLink = `Hello ${user.name} Please click <a href="http://localhost:5173/reset-password?token=${resetToken}&id=${user.id}">here</a> to reset your password`;
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
    const { token, id } = req.query;
    try {
      if (typeof id !== "string" || typeof token !== "string") {
        return res.status(400).json({ message: "Inavalid token or userId" });
      }
      const user = await getResetToken(id, token);
      const findUser = await resetPasswordUseCase(userRepository).findUser(id);
      const updatePassword = await resetPasswordUseCase(
        userRepository
      ).updatePassword(id, password);
      if (updatePassword) {
        console.log("updated......");

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

  const signOutUser = (req: Request, res: Response) => {
    console.log("signout");
    try {
      const signOutUser = signOut(res);
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
  };
};

export default userAuthController;
