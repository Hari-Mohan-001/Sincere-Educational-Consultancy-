import { COUNSELLOR_ENDPOINT, USER_ENDPOINT } from "../Constants/Constants";
import axiosInstance from "./axiosInstance";

interface chatParams {
  counsellorId: string;
  counsellorModel: string;
  userId: string;
  userModel: string;
}

export const chatApi = {
  uploadChatImage: async (image: string | null) => {
    try {
      const response = await axiosInstance.post(`/upload-chat-image`, {
        image,
      });
   
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  },

  fetchAllMessages: async (userEndPoint: string, params: chatParams) => {
    try {
      const response = await axiosInstance.get(`${userEndPoint}/messages`, {
        params,
      });
      const messages = response.data.data;
      return messages;
    } catch (error) {
      console.log(error);
    }
  },

  fetchUserStatus: async(id:string, isCounsellor:boolean)=>{
    try {
      let endPoint
      if(isCounsellor){
            endPoint = COUNSELLOR_ENDPOINT
      }else{
        endPoint = USER_ENDPOINT
      }
      const response = await axiosInstance.get(`${endPoint}/status/${id}`)
      const user = response.data.data
      return user
    } catch (error) {
      console.log(error);
      
    }
  },

  uploadChatAudio :async(base64Audio:string,audioBlob:Blob)=>{
    try { 
      
      const response = await axiosInstance.post(`/upload-chat-audio`,{
        audio: base64Audio,
      fileType: audioBlob.type, // Send the audio file's MIME type
      })
      return response.data.data
    } catch (error) {
      
    }
  }
};
