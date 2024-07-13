import {Response} from "express"
export const logOut =(res:Response)=>{
    res.clearCookie("adminAuthToken")
    res.status(200).json({message: "signedOut successfully"})
    
}