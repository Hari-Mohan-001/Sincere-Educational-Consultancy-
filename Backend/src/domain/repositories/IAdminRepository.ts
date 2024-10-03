import { userStatusData } from "../../application/interfaces/userStatusData"
import {Admin} from "../entities/admin" 
import { Counsellor } from "../entities/counsellor"

export interface IAdminRepository{
    createAdmin(user:Admin) : Promise<Admin>
      doesEmailExist(email:string):Promise<boolean>
      findAdminByEmail(email:string):Promise<Admin | null>
      findCounsellorByEmail(email:string):Promise<Admin | null>
      getCounsellorData(id:string):Promise<userStatusData | null>
      getAllApprovedCounsellors():Promise<Counsellor[] | null>
      getUnApprovedCounsellorCount():Promise<number | null>
      getUnApprovedCounsellors():Promise<Counsellor[] | null>
      approveCounsellor(counsellorId:string):Promise<boolean>
      isCounsellorApproved(email:string):Promise<boolean>
}