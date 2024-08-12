import { USER_ENDPOINT } from "../Constants/Constants"
import axiosInstance from "./axiosInstance"

interface UserData{
    name?:string,
    email?:string,
    mobile?:string,
    image?:string,
    password?:string
}

export const userApi = {

    updateUser : async(userData:UserData, userId:string)=>{
        try {
            console.log(userData,'updata');
            
            const response = await axiosInstance.put(`/${USER_ENDPOINT}/${userId}`,{userData})
                if(response.status==200){
                    return true 
                }else{
                    return false
                }
               
        } catch (error) {
            console.log(error);
            
        }
    },

}