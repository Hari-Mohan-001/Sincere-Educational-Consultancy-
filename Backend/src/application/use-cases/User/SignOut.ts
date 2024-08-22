import {Request, Response} from "express"
import { IUserRepository } from "../../../domain/repositories/IUserRepositary";

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