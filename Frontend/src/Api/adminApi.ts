import { ADMIN_ENDPOINT } from "../Constants/Constants";
import { CountryData } from "../Interface/Country/ICountry";
import {
  AddEnrollmentData,
  updateEnrollmentData,
} from "../Interface/Enrollment/IEnrollment";
import { MonthlyOrder, MonthlyRevenue } from "../Interface/Order/IOrder";
import axiosInstance from "./axiosInstance";

export const adminApi = {
  //add new country
  addCountry: async (countryData: CountryData) => {
    try {
      const response = await axiosInstance.post(
        `/${ADMIN_ENDPOINT}/country`,
        countryData
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

  //fetch all courses
  getAllCourses: async () => {
    try {
      const response = await axiosInstance.get(`/${ADMIN_ENDPOINT}/courses`);
      if (response.status === 200) {
        const courses = response.data.data;
        return courses;
        return;
      } else {
        return "Unable to fetch courses";
      }
    } catch (error) {
      console.log(error);
    }
  },
  //fetching all students
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get(`/${ADMIN_ENDPOINT}/users`);
      if (response.status === 200) {
        const users = response.data.userData;
        return users;
      } else {
        return "Unexpected response status/ failed to fetch";
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  },

  //fetch all counsellors
getAllCounsellors : async()=>{
  try {
    const response = await axiosInstance.get(`/${ADMIN_ENDPOINT}/counsellors`)
    if(response.status ===200){
      const counsellors = response.data.data
      return counsellors
    }
  } catch (error) {
    console.error("API Error:", error);
  }
},

  blockUser: async (userId: string) => {
    try {
      const response = await axiosInstance.patch(
        `/${ADMIN_ENDPOINT}/user/${userId}`
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

  //adding enrollment
  addEnrollment: async (enrollmentData: AddEnrollmentData) => {
    try {
      const response = await axiosInstance.post(
        `/${ADMIN_ENDPOINT}/enrollment`,
        { enrollmentData }
      );
      if (response.status === 200) {
        return true;
      } else {
        return "Error occured";
      }
    } catch (error) {}
  },

  //fetch all enrollments
  getEnrollments: async () => {
    try {
      const response = await axiosInstance.get(`/${ADMIN_ENDPOINT}/enrollment`);
      const enrollments = response.data.data;
      return enrollments;
    } catch (error) {
      console.log(error);
    }
  },

  //update enrollment
  updateEnrollment: async (enrollData: updateEnrollmentData) => {
    try {
      const response = await axiosInstance.put(
        `/${ADMIN_ENDPOINT}/enrollment`,
        { enrollData }
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

  //fetch unApproved universities
  getUnapprovedUniversities: async () => {
    try {
      const response = await axiosInstance.get(
        `/${ADMIN_ENDPOINT}/not-approved-universities`
      );
      if (response.status === 200) {
        const universities = response.data.data;
        return universities;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //approve a University
  approveUniversity: async (universityId: string) => {
    try {
      const response = await axiosInstance.patch(
        `/${ADMIN_ENDPOINT}/university/${universityId}`
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

  getUnapprovedUniversitiesCount: async () => {
    try {
      const response = await axiosInstance.get(
        `/${ADMIN_ENDPOINT}/not-approved-universities-count`
      );
      if (response.status === 200) {
        const count = response.data.data;
        return count;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch approved universities
  getAllApprovedUniversities: async () => {
    try {
      const response = await axiosInstance.get(
        `/${ADMIN_ENDPOINT}/approved-universities`
      );
      if (response.status === 200) {
        const universities = response.data.data;
        return universities;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetching total revenue
  getTotalRevenue: async (timeframe: string | MonthlyRevenue[]) => {
    try {
      const response = await axiosInstance.get(
        `/${ADMIN_ENDPOINT}/total-revenue/${timeframe}`
      );
      if (response.status === 200) {
        const amount = response.data.data;
        return amount;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetching total order count
  getTotalOrders: async (timeframe: string | MonthlyOrder[]) => {
    try {
      const response = await axiosInstance.get(
        `/${ADMIN_ENDPOINT}/total-orders/${timeframe}`
      );
      if (response.status === 200) {
        const orders = response.data.data;
        return orders;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetching all orders

  getAllOrders: async (startDate?: string, endDate?: string) => {
    try {
      let Url = `/${ADMIN_ENDPOINT}/orders`;
      if (startDate && endDate) {
        Url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await axiosInstance.get(Url);
      if (response.status === 200) {
        const orders = response.data.data;
        return orders;
      }
    } catch (error) {
      console.log(error);
    }
  },

  signOut: async () => {
    try {
      const response = await axiosInstance.get(`/${ADMIN_ENDPOINT}/signout`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
