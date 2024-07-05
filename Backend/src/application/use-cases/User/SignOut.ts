import {Response} from "express"
export const signOut =(res:Response)=>{
    res.clearCookie("userAuthToken")
    res.status(200).json({message: "signedOut successfully"})
    
}