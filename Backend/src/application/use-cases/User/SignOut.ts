import {Request, Response} from "express"
import { IUserRepository } from "../../../domain/repositories/IUserRepositary";
// interface UserPayload {
//     userId: string;
//     // Add any other properties that your user object might have
//   }

// //   declare global {
// //     namespace Express {
// //       interface Request {
// //         user?: UserPayload;
// //       }
// //     }
// //   }

export const signOut =(userRepository:IUserRepository)=>{

    const execute = async(userId:string ,res:Response)=>{
       const deleteToken =  await userRepository.deleteUserRefreshToken(userId)
        res.clearCookie("userAuthToken")
        if(deleteToken){
            return true
        }else{
            return false
        }
    }
    return{
        execute
    }
     
}   