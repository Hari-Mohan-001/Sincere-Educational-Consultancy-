import { IUserRepository } from "../../../domain/repositories/IUserRepositary"

export const updateRefreshToken =(userRepository:IUserRepository)=>{
    const execute = async(refreshToken:string,userId:string)=>{
       const update = await userRepository.updateUserRefreshToken(refreshToken,userId)
       if(update){
        return true
       }else{
        return false
       }
    }
    return {
        execute}
}