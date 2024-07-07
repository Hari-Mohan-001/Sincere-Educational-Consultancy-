import bcrypt from "bcrypt"

import { IUserRepository } from "../../../domain/repositories/IUserRepositary"

const resetTokenStorage :Map<string, {token:string, tokenExpiry:number }> = new Map()
export const storeResetToken =(userId:string,token:string,tokenExpiry:number)=>{
resetTokenStorage.set(userId,{token,tokenExpiry})
}

export const getResetToken=(id:string,token:string)=>{
          const data=  resetTokenStorage.get(id)
          if(!data){
            throw new Error("Invalid or session expired");
            
          }
          if(data.token!==token && data.tokenExpiry<Date.now()){
            throw new Error("Ivalid or session expired")
          }
          return true
}

export const resetPasswordUseCase = (userRepository:IUserRepository)=>{

    const findUser = async(id:string)=>{
        try {
            const user = await userRepository.findUserById(id)
        if(!user){
            throw new Error("User does not exist");  
        }
        return user
        } catch (error) {
            throw new Error("User does not exist");
            
        }
        
    }

    const updatePassword = async(id:string, password:string):Promise<boolean>=>{
        try {
            const hashedPassword = bcrypt.hashSync(password,10)
            const user = await userRepository.resetPassword(id,hashedPassword)
            if(!user){
                throw new Error("Password reset failed");   
            }
            return true
        } catch (error) {
            throw new Error("Password rest failed");
            
        }
       
    }
    return{
        findUser,
        updatePassword
    }
    
}

