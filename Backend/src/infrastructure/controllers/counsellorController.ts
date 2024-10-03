import { adminDTO } from "../../application/dtos/adminDto";
import { CounsellorSignUp } from "../../application/use-cases/Counsellor/cousellorSignup";
import { existingCouncellor } from "../../application/use-cases/Counsellor/existingCounsellor";
import { mongoAdminRepository } from "../persistance/mongoAdminRepository";
import { Request, Response, NextFunction } from "express";
import { generateCounsellorJwtToken } from "../security/generateCounsellorJwt";
import { counsellorSignIn } from "../../application/use-cases/Counsellor/counsellorSignin";
import { SignOut } from "../../application/use-cases/Counsellor/counsellorsignOut";
import { verifyCounsellorToken } from "../middleware/verifyCounsellorToken";
import { getCounsellorData } from "../../application/use-cases/Counsellor/getCounsellorStatus";
import { getApprovedCounsellors } from "../../application/use-cases/Counsellor/getAllCounsellors";
import {
  approveTheCounsellor,
  unApprovedCounsellors,
  unApprovedCount,
} from "../../application/use-cases/Counsellor/getUnApprovedCount";

const cousellorRepository = new mongoAdminRepository();

const counsellorController = () => {
  const signUp = async (req: Request, res: Response) => {
    const { name, email, mobile, password, country } = req.body;

    try {
      const findCounsellor = await existingCouncellor(
        cousellorRepository
      ).execute(email);

      if (!findCounsellor) {
        const counsellorDto = new adminDTO(
          name,
          email,
          mobile,
          password,
          country
        );

        const newCounsellor = await CounsellorSignUp(
          cousellorRepository
        ).execute(counsellorDto);
        const { password: hashedPassword, ...counselor } = newCounsellor;
        generateCounsellorJwtToken(res, newCounsellor.id);

        res.status(200).json({ message: "success", counselor });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const counsellor_doc = await counsellorSignIn(
        cousellorRepository
      ).execute(email, password);

      if (counsellor_doc) {
        generateCounsellorJwtToken(res, counsellor_doc.id);
        const { password: hashedPassword, ...counsellor } = counsellor_doc;
        res.status(200).json({ message: "success", counsellor });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };

  const signout = async (req: Request, res: Response) => {
    try {
      const Counsellorsignout = await SignOut(res);
      res.status(200).json({ message: "signout success" });
    } catch (error) {}
  };

  const getCounsellorStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const counsellorId = req.params.counsellorId;
      const counsellor = await getCounsellorData(cousellorRepository).execute(
        counsellorId
      );
      if (counsellor) {
        res.status(200).json({ message: "success", data: counsellor });
      }
    } catch (error) {
      next(error);
    }
  };

  const getAllApprovedCounsellors = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const counsellorsData = await getApprovedCounsellors(
        cousellorRepository
      ).execute();

      const counsellors = counsellorsData?.map((counsellor) => {
        const { password, ...counsellors } = counsellor;
        return counsellors;
      });

      res.status(200).json({ message: "success", data: counsellors });
    } catch (error) {
      next(error);
    }
  };

  const getUnApprovedCounsellorCount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const count = await unApprovedCount(cousellorRepository).execute();
      console.log(count);

      res.status(200).json({ message: "success", data: count });
    } catch (error) {
      next(error);
    }
  };
  const getUnApprovedCounsellors = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const counsellorsData = await unApprovedCounsellors(
        cousellorRepository
      ).execute();
      const counsellors = counsellorsData?.map((counsellor) => {
        const { password, ...counsellors } = counsellor;
        return counsellors;
      });
      console.log(counsellors);

      res.status(200).json({ message: "success", data: counsellors });
    } catch (error) {
      next(error);
    }
  };

  const approveCounsellor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const counsellorId = req.params.counsellorId;

      const response = await approveTheCounsellor(cousellorRepository).execute(
        counsellorId
      );
      if (response) {
        res.status(200).json({ message: "success", data: response });
      }
    } catch (error) {
      next(error);
    }
  };

  return {
    signUp,
    signIn,
    signout,
    getCounsellorStatus,
    getAllApprovedCounsellors,
    getUnApprovedCounsellorCount,
    getUnApprovedCounsellors,
    approveCounsellor,
  };
};

export default counsellorController;
