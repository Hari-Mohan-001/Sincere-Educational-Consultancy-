import twilio from "twilio"

const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSID, authToken)

export async function sendOtp(mobile: string , otp:string): Promise<void> {
    try {
        const sendUserOtp= await client.messages.create({
            body:`${otp} is the OTP to create Sincere Edu Services account`,
            // messagingServiceSid:"VA71f9cdc693107d2994f04d6fbdd8a6d2", 
            from:process.env.TWILIO_NUMBER,
            to:mobile
        })
    } catch (error) {
        throw new Error("Failed to send otp");
        
    }
    
        
        
   
    
}