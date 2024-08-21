import jwt from 'jsonwebtoken'

const refershTokenSecret = process.env.JWT_REFRESH_SECRET||"refreshsecretkey";

export const verifyRefreshToken = (refreshToken:string)=>{

    const decode = jwt.verify(refreshToken , refershTokenSecret)  as { userId: string };
    return decode
}