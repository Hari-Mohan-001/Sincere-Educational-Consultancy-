import { Request, Response } from "express";
import { SignUp } from "../../application/use-cases/User/signUp";
import { userDTO } from "../../application/dtos/userDto";
import { v4 as uuidv4 } from "uuid";
import otpGenerator from "otp-generator";
import {
  storeUserDetails,
  verifyOtpAndGetUser,
} from "../../application/use-cases/User/verifyOtp";
import { sendOtp } from "../../infrastructure/services/twilioServices";

export class userAuthController {
  constructor(private signUpUseCase: SignUp) {}

  public async signUp(req: Request, res: Response): Promise<void> {
    const { name, email, mobile, password, qualification } = req.body;
    const userDto = new userDTO(name, email, mobile, password, qualification);
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const token = uuidv4();
    storeUserDetails(userDto, otp, token);  
    try {
      const executeSendOtp = await sendOtp(mobile, otp);
      res.status(201).json({ message: "otp send successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  public async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { otp, token } = req.body;
      const userDto = verifyOtpAndGetUser(token, otp);
      if (userDto) {
        const user = await this.signUpUseCase.execute(userDto);

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
  }
}
