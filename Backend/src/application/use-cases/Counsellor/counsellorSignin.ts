import {IAdminRepository} from "../../../domain/repositories/IAdminRepository"
import bcrypt from "bcrypt"

export const counsellorSignIn = (councellorRepository:IAdminRepository)=>{

    const execute =async (email:string, password:string)=>{
        
           const counsellor = await councellorRepository.findCounsellorByEmail(email)
           if(!counsellor){
            throw new Error("Invalid Credentials"); 
           }
           const isApproved = await councellorRepository.isCounsellorApproved(email)
           
           
           if(!isApproved){
            throw new Error("Approval Pending from admin")
           }
           const isValidPassword = bcrypt.compareSync(password, counsellor.password)
           if(!isValidPassword){
            throw new Error("Invalid Credentials");  
           }
         return counsellor
    }

    return{
        execute
    }
}