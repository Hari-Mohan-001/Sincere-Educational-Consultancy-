import {Admin} from "../../../domain/entities/admin"
import {IAdminRepository} from "../../../domain/repositories/IAdminRepository"
import bcrypt from "bcrypt"
// const adminEmail = process.env.ADMIN_EMAIL;
// const adminPassword = process.env.ADMIN_PASSWORD;
// export const login = async (email: string, password: string):Promise<boolean> => {
//   if (email === adminEmail && password === adminPassword) {
//     return true;
//   } else {
//     throw new Error("Invalid credentials");
//   }
// };

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
