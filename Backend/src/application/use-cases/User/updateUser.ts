import bcrypt from "bcrypt"
import { IUserRepository } from "../../../domain/repositories/IUserRepositary"
import { userUpdateDTO } from "../../dtos/userUpdateDto";

export const updateTheUser = (userRepository:IUserRepository)=>{
    const execute = async(userId:string, userDto:userUpdateDTO)=>{
      if(userDto.password){
        userDto.password = bcrypt.hashSync(userDto.password,10)
      }
      
         const updatedUser = await userRepository.updateUser(userId,userDto)
         if(updatedUser){
          const{password:hashedPassword , ...user} = updatedUser
          return user
            
         }else{
          throw new Error("Failed to update");
         }
         
    }
    return{
        execute
    }
}