import { Admin } from "../../../domain/entities/admin";
import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";
import { adminDTO } from "../../dtos/adminDto";

 export const CounsellorSignUp = (councellorRepository:IAdminRepository)=>{
    const execute = async (counsellorDto:adminDTO)=>{
        const counsellor = new Admin(
            "",
            counsellorDto.name,
            counsellorDto.email,
            counsellorDto.mobile,
            counsellorDto.password,
            counsellorDto.country,
            counsellorDto.role,
            counsellorDto.image
          );

          await counsellor.hashPassword()
          const newCounsellor = await councellorRepository.createAdmin(counsellor)
          return newCounsellor
    }
    return{
        execute
    } 
}