import axiosInstance from "./axiosInstance"

export const chatApi = {

    uploadChatImage: async(image:string|null)=>{
        try {
            
          const response = await axiosInstance.post(`/upload-chat-image`,{image})  
          console.log(response.data);
          return response.data.data
          
        } catch (error) {
            console.log(error);
            
        }
    }

}