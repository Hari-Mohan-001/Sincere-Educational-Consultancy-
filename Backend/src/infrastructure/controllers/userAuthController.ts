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

const userAuthController = (
  signUpUseCase: SignUp,
  checkUser: checkUserExist,
  signInUseCase: signInUseCase
) => {
  const signUp = async (req: Request, res: Response): Promise<void> => {
    const { name, email, mobile, password, qualification } = req.body;
    const userDto = new userDTO(name, email, mobile, password, qualification);
    try {
      const existUser = await checkUser.execute(userDto);
      console.log("signup");

      const otp = generateOtp();
      const token = uuidv4();
      storeUserDetails(userDto, otp, token);
      console.log(otp, token);

      const executeSendOtp = await sendOtp(mobile, otp);

      res.status(201).json({ message: "otp send successfully" });
    } catch (error) {
      res.status(401).json(error);
    }
  };

  const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { otp, token } = req.body;
      const userDto = verifyOtpAndGetUser(token, otp);
      if (userDto) {
        const userDoc = await signUpUseCase.execute(userDto);
        const { password: hashedPassword, ...user } = userDoc;
        generateJwtToken(res, userDoc.id);

        res
          .status(201)
          .json({ message: "user created successfully", data: user });
      } else {
        res.status(400).json({ message: "Invalid OTP or token" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "failed to create user", error: error.message });
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
      res.status(201).json({ message: "user Signed succesfully", userData });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };

  const signOutUser =  (req:Request, res:Response) :void=> {
        signOut(res)
  }
  return {
    signUp,
    verifyOtp,
    signInUser,
    signOutUser
  };
};

export default userAuthController;
