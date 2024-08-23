import axiosInstance from "./axiosInstance";

export const api = {
  //fetch countries
  getAllCountries: async () => {
    try {
      
      
      const response = await axiosInstance.get(`/countries`);
     
      
      if (response.status === 200) {
        const countries = response.data.data;
        return countries;
      }
    } catch (error) {
      console.log(error);
    }
  },
  //fetch universities  with respect to the country
  getUniversities: async (countryId: string) => {
    try {
      const response = await axiosInstance.get(`/universities/${countryId}`);
      if (response.status === 200) {
        const universities = response.data.getUniversities;
        return universities;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch the domains
  getAllDomains: async () => {
    try {
      const response = await axiosInstance.get(`/domains`);
      if (response.status === 200) {
        const domains = response.data.data;
        return domains;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch courses by domain
  getCoursesByDomain: async (domainId: string) => {
    try {
      const response = await axiosInstance.get(`/courses/${domainId}`);
      if (response.status === 200) {
        const courses = response.data.data;
        return courses;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch Courses
  getCourses: async () => {
    try {
      const response = await axiosInstance.get(`/courses`);
      if (response.status === 200) {
        const courses = response.data.data;
        return courses;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch course details by course Id
  getCourseDetails: async (courseId: string) => {
    try {
      const response = await axiosInstance.get(`/course/${courseId}`);
      if (response.status === 200) {
        const course = response.data.data;
        return course;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch universities for a course
  getUniversitiesForACourse: async (courseId: string) => {
    try {
      const response = await axiosInstance.get(
        `/universities-course/${courseId}`
      );
      if (response.status === 200) {
        const universities = response.data.data;
        return universities;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch University details by university id
  getUniversityDetails: async (universityId: string) => {
    try {
      const response = await axiosInstance.get(`/university/${universityId}`);
      if (response.status === 200) {
        const university = response.data.data;
        return university;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //fetch all universities(approved)
  getAllUniversities: async () => {
    try {
      const response = await axiosInstance.get(`/universities`);
      if (response.status === 200) {
        const universities = response.data.getAllUniversities;
        return universities;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
