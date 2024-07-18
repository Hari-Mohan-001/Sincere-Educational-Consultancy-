import {Response} from "express"
export const signOut =(res:Response)=>{
    console.log('clear user');
    
    res.clearCookie("userAuthToken")
    res.status(200).json({message: "signedOut successfully"})
    
}   