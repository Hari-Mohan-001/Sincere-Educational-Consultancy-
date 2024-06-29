import express from "express"
import { Request,Response } from "express"
import {userAuthController} from "../controllers/userAuthController"
import { mongoUserRepository } from "../../infrastructure/persistance/mongoUserRepository"
import { SignUp } from "../../application/use-cases/User/signUp"
import { verifyOtpAndGetUser } from "../../application/use-cases/User/verifyOtp"

const userAuthRoute = express.Router()
const userRepository = new mongoUserRepository()
const signUpUseCase = new SignUp(userRepository)
const UserAuthController = new userAuthController(signUpUseCase) 



userAuthRoute.post("/signUp",(req:Request , res:Response) => UserAuthController.signUp(req,res) )
userAuthRoute.post("/verifyOtp",(req:Request,res:Response)=>UserAuthController.verifyOtp(req,res))

export default userAuthRoute