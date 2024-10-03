import { USER_ENDPOINT } from "../Constants/Constants";
import { CheckoutData } from "../Interface/CheckOut/ICheckout";
import axiosInstance from "./axiosInstance";

interface UserData {
  name?: string;
  email?: string;
  mobile?: string;
  image?: string;
  password?: string;
}

export const userApi = {
  //update The user
  updateUser: async (userData: UserData, userId: string) => {
    try {
      const response = await axiosInstance.put(
        `/${USER_ENDPOINT}/${userId}`,
        userData
      );
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch the erollments listed (chat, video call)
  getAllEnrollments: async () => {
    try {
      const response = await axiosInstance.get(`/${USER_ENDPOINT}/enrollments`);
      if (response.status === 200) {
        const enrollments = response.data.data;
        return enrollments;
      }
    } catch (error) {
      console.log(error);
    }
  },

  // create checkout
  checkOut: async (data: CheckoutData) => {
    try {
      const response = await axiosInstance.post(
        `/${USER_ENDPOINT}/create-checkout`,
        data
      );
      if (response.status === 200) {
        const sessionId = response.data.data;
        return sessionId;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetching the events of an user bt user id
  getEvents: async (userId: string) => {
    try {
      const response = await axiosInstance.get(
        `/${USER_ENDPOINT}/events/${userId}`
      );
      if (response.status === 200) {
        const events = response.data.data;
        return events;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //request password reset
  passwordResetRequest: async (email: string) => {
    try {
      console.log("reste", email);

      const response = await axiosInstance.post(
        `/${USER_ENDPOINT}/request-password-reset`,
        { email: email }
      );
      if (response.status === 200) {
        return true;
      } else {
        return response.data.message;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //reset the password with new password
  resetPassword: async (id: string | null, password: string) => {
    try {
      const response = await axiosInstance.post(
        `/${USER_ENDPOINT}/reset-password?uniqueId=${id}`,
        { password: password }
      );
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch a user
  getAUser: async (userId?: string) => {
    try {
      if (userId) {
        const response = await axiosInstance.get(
          `/${USER_ENDPOINT}/user/${userId}`
        );
        if (response.status == 200) {
          const user = response.data.data;
          return user;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch courses according to the qualification
  getEligibleCourses: async (qualification?: string) => {
    try {
      const response = await axiosInstance.get(
        `/${USER_ENDPOINT}/courses/${qualification}`
      );
      if (response.status === 200) {
        const courses = response.data.data;
        console.log(courses);

        return courses;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch orders of a user by user Id

  getUserOrder: async (userId?: string) => {
    try {
      const response = await axiosInstance.get(
        `/${USER_ENDPOINT}/orders/${userId}`
      );
      if (response.status == 200 || response.status == 201) {
        const orders = response.data.data;
        return orders;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //request Reschedule
  rescheduleRequest : async(orderId:string)=>{
  const response = await axiosInstance.put(`/${USER_ENDPOINT}/reschedule/${orderId}`)
  if(response.status ===200){
    return true
  }
  },

  //signOut user
  signOut: async () => {
    try {
      const response = await axiosInstance.get(`/${USER_ENDPOINT}/signOut`);
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
