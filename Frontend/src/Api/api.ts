import axiosInstance from "./axiosInstance";

export const api = {

    //fetch countries
   getAllCountries:async()=>{
    try {
        const response = await axiosInstance.get(`/countries`)
        if(response.status===200){
            const countries = response.data.data
            return countries
        }
    } catch (error) {
        console.log(error);
        
    }
   }

}