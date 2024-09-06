import { userStatusData } from "../../application/interfaces/userStatusData"
import {Admin} from "../entities/admin" 

export interface IAdminRepository{
    createAdmin(user:Admin) : Promise<Admin>
      doesEmailExist(email:string):Promise<boolean>
      findAdminByEmail(email:string):Promise<Admin | null>
      findCounsellorByEmail(email:string):Promise<Admin | null>
      getCounsellorData(id:string):Promise<userStatusData | null>
}