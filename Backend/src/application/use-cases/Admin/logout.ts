import {Response} from "express"
export const adminLogOut =(res:Response)=>{
    res.clearCookie("adminAuthToken")
    res.status(200).json({message: "signedOut successfully"})   
}