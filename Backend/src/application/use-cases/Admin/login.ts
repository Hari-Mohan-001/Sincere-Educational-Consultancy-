import {Admin} from "../../../domain/entities/admin"
import {IAdminRepository} from "../../../domain/repositories/IAdminRepository"
import bcrypt from "bcrypt"

export const adminLoginUseCase = (adminRepository:IAdminRepository)=>{

  const execute = async(email:string, password:string)=>{
      const admin = await adminRepository.findAdminByEmail(email)
      if(!admin){
        throw new Error("Invalid credentials");
        
      }
      const isValidPassword = bcrypt.compareSync(password,admin.password)
      if(!isValidPassword){
        throw new Error("Invalid credentials");  
      }
      return admin
  }

  return{
    execute
  }
}
