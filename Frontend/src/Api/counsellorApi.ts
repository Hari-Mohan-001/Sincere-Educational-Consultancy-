import { COUNSELLOR_ENDPOINT } from "../Constants/Constants";
import { callData } from "../Interface/Counsellor/CounsellorInterface";
import { CreateCourseData } from "../Interface/Course/CourseData";
import { DomainData } from "../Interface/Domain/IDomain";
import { EventData } from "../Interface/Events/IEvent";
import { CreateUniversityData } from "../Interface/University/UniversityData";
import axiosInstance from "./axiosInstance";

export const counsellorApi = {
  //sendimg call link
  sendVideoCallLink: async (data: callData) => {
    try {
      const response = await axiosInstance.post(
        `${COUNSELLOR_ENDPOINT}/send-meet-link`,
        data
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

  //fetch universities for counsellor with respect to the country
  addCourse: async (formData: CreateCourseData) => {
    try {
      const response = await axiosInstance.post(
        `${COUNSELLOR_ENDPOINT}/course`,
        formData
      );
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch courses for contry counsellor with country id

  getCoursesByCountryId: async (countryId: string) => {
    try {
      const response = await axiosInstance.get(
        `${COUNSELLOR_ENDPOINT}/courses/${countryId}`
      );
      if (response.status === 200) {
        const courses = response.data.data;
        return courses;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //add new domain
  addDomain: async (domainData: DomainData) => {
    try {
      const response = await axiosInstance.post(
        `${COUNSELLOR_ENDPOINT}/domain`,
        domainData
      );
      if (response.status === 200) {
        const courses = response.data.data;
        return courses;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch enrolled student orders
  getErrolledOrders: async (countryId: string) => {
    try {
      const response = await axiosInstance.get(
        `${COUNSELLOR_ENDPOINT}/orders/${countryId}`
      );
      if (response.status === 200) {
        const orders = response.data.data;
        return orders;
      }
    } catch (error) {
      console.log(error);
    }
  },

  // create event with the schedueled meeting details
  createEventWithMeetingDetails: async (eventDetails: EventData) => {
    try {
      const response = await axiosInstance.post(
        `${COUNSELLOR_ENDPOINT}/event`,
        eventDetails
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

  //add new university

  addUniversity: async (formData: CreateUniversityData) => {
    try {
      const response = await axiosInstance.post(
        `${COUNSELLOR_ENDPOINT}/university`,
        formData
      );
      console.log(response);

      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //signout
  signout: async () => {
    try {
      const response = await axiosInstance.get(
        `${COUNSELLOR_ENDPOINT}/signout`
      );
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
