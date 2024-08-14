import { ADMIN_ENDPOINT } from "../Constants/Constants";
import axiosInstance from "./axiosInstance";

export const adminApi = {
  //fetching all students
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get(`/${ADMIN_ENDPOINT}/users`);
      if (response.status === 200) {
        const users = response.data.userData;
        return users;
      }else{
        return "Unexpected response status/ failed to fetch"
      }
    } catch (error) {
        console.error("API Error:", error);
        // return { data: null, error: error.message || "Something went wrong" };
    }
  },
  //fetching total revenue
  getTotalRevenue : async(timeframe:string)=>{
    try {
        const response = await axiosInstance.get(`/${ADMIN_ENDPOINT}/total-revenue/${timeframe}`)
        if(response.status===200){
            const amount = response.data.data
            console.log('amount', amount);
            
            return amount
        }
    } catch (error) {
       console.log(error);
        
    }
  },

  //fetching total order count
  getTotalOrders :async(timeframe:string)=>{
          try {
            const response = await axiosInstance.get(`/${ADMIN_ENDPOINT}/total-orders/${timeframe}`)
            if(response.status ===200){
              const orders = response.data.data
              return orders
            }
          } catch (error) {
            console.log(error);
            
          }
  },

  //fetching all orders

  getAllOrders: async()=>{
       try {
        const response = await axiosInstance.get(`/${ADMIN_ENDPOINT}/orders`)
        if(response.status ===200){
          const orders = response.data.data
          return orders
        }
       } catch (error) {
        console.log(error);
       }
  }
};
