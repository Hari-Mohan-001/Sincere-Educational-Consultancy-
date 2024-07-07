import { userDTO } from "../../dtos/userDto";

const otpStorage :Map<string, {otp:string, userDto:userDTO}> = new Map()

export const storeUserDetails = (userDto:userDTO, otp:string , token:string)=>{
       otpStorage.set(token,{otp ,userDto})
}

export const verifyOtpAndGetUser =(token:string, otp:string):userDTO|null=>{
     const storedData = otpStorage.get(token)
     if(storedData && storedData.otp === otp){
        return storedData.userDto
     }else{
      throw new Error("Invalid Otp");
      
     }
     return null
}