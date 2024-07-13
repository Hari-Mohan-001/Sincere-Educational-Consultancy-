import { Request,Response } from "express"
import { adminLoginUseCase} from "../../application/use-cases/Admin/login"
import { generateAdminJwtToken } from "../security/generateAdminJwt"
import { logOut } from "../../application/use-cases/Admin/logout"
import { mongoAdminRepository } from "../persistance/mongoAdminRepository"


const adminRepository = new mongoAdminRepository()

 const adminController = ()=>{

    const adminLogin = async(req:Request,res:Response)=>{
    try {
            const{email, password} = req.body
            const admin_doc = await adminLoginUseCase(adminRepository).execute(email, password)
            if(admin_doc){
                generateAdminJwtToken(res,admin_doc.id)
             const {password:hashedPassword, ...adminData} = admin_doc
                res.status(200).json({message:"login successfull",adminData})
            }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
          } else {
            res.status(400).json({ message: "An unknown error occurred" });
          }
    }    
       }

       const adminLogout = async (req:Request,res:Response)=>{
           try {
               logOut(res)
           } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
              } else {
                res.status(400).json({ message: "An unknown error occurred" });
              }
           }
       }
       const getAllstudents=async (req:Request,res:Response)=>{
        try {
            
        } catch (error) {
            
        }
       }
       return{
        adminLogin,
        adminLogout,
       }
}

export default adminController