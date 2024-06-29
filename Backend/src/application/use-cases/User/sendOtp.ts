import { sendOtp } from "../../../infrastructure/services/twilioServices";

export async function executeSendOtp(mobile:string, otp: string):Promise<void> {

    await sendOtp(mobile, otp)
    
}