import {Response} from "express"
export const SignOut =(res:Response)=>{
    res.clearCookie("counsellorAuthToken",{
        httpOnly: true,
        sameSite: "strict",
        maxAge: 0,
      });
    
    res.status(200).json({message: "signedOut successfully"})
    
}