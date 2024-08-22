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
      console.log(response.data);
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
};
